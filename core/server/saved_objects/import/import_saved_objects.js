"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importSavedObjectsFromStream = importSavedObjectsFromStream;

var _collect_saved_objects = require("./collect_saved_objects");

var _validate_references = require("./validate_references");

var _check_origin_conflicts = require("./check_origin_conflicts");

var _create_saved_objects = require("./create_saved_objects");

var _check_conflicts = require("./check_conflicts");

var _regenerate_ids = require("./regenerate_ids");

/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Import saved objects from given stream. See the {@link SavedObjectsImportOptions | options} for more
 * detailed information.
 *
 * @public
 */
async function importSavedObjectsFromStream({
  readStream,
  objectLimit,
  overwrite,
  createNewCopies,
  savedObjectsClient,
  typeRegistry,
  namespace
}) {
  let errorAccumulator = [];
  const supportedTypes = typeRegistry.getImportableAndExportableTypes().map(type => type.name); // Get the objects to import

  const collectSavedObjectsResult = await (0, _collect_saved_objects.collectSavedObjects)({
    readStream,
    objectLimit,
    supportedTypes
  });
  errorAccumulator = [...errorAccumulator, ...collectSavedObjectsResult.errors];
  /** Map of all IDs for objects that we are attempting to import; each value is empty by default */

  let importIdMap = collectSavedObjectsResult.importIdMap;
  let pendingOverwrites = new Set(); // Validate references

  const validateReferencesResult = await (0, _validate_references.validateReferences)(collectSavedObjectsResult.collectedObjects, savedObjectsClient, namespace);
  errorAccumulator = [...errorAccumulator, ...validateReferencesResult];

  if (createNewCopies) {
    importIdMap = (0, _regenerate_ids.regenerateIds)(collectSavedObjectsResult.collectedObjects);
  } else {
    // Check single-namespace objects for conflicts in this namespace, and check multi-namespace objects for conflicts across all namespaces
    const checkConflictsParams = {
      objects: collectSavedObjectsResult.collectedObjects,
      savedObjectsClient,
      namespace,
      ignoreRegularConflicts: overwrite
    };
    const checkConflictsResult = await (0, _check_conflicts.checkConflicts)(checkConflictsParams);
    errorAccumulator = [...errorAccumulator, ...checkConflictsResult.errors];
    importIdMap = new Map([...importIdMap, ...checkConflictsResult.importIdMap]);
    pendingOverwrites = checkConflictsResult.pendingOverwrites; // Check multi-namespace object types for origin conflicts in this namespace

    const checkOriginConflictsParams = {
      objects: checkConflictsResult.filteredObjects,
      savedObjectsClient,
      typeRegistry,
      namespace,
      ignoreRegularConflicts: overwrite,
      importIdMap
    };
    const checkOriginConflictsResult = await (0, _check_origin_conflicts.checkOriginConflicts)(checkOriginConflictsParams);
    errorAccumulator = [...errorAccumulator, ...checkOriginConflictsResult.errors];
    importIdMap = new Map([...importIdMap, ...checkOriginConflictsResult.importIdMap]);
    pendingOverwrites = new Set([...pendingOverwrites, ...checkOriginConflictsResult.pendingOverwrites]);
  } // Create objects in bulk


  const createSavedObjectsParams = {
    objects: collectSavedObjectsResult.collectedObjects,
    accumulatedErrors: errorAccumulator,
    savedObjectsClient,
    importIdMap,
    overwrite,
    namespace
  };
  const createSavedObjectsResult = await (0, _create_saved_objects.createSavedObjects)(createSavedObjectsParams);
  errorAccumulator = [...errorAccumulator, ...createSavedObjectsResult.errors];
  const successResults = createSavedObjectsResult.createdObjects.map(({
    type,
    id,
    attributes: {
      title
    },
    destinationId,
    originId
  }) => {
    var _typeRegistry$getType, _typeRegistry$getType2;

    const meta = {
      title,
      icon: (_typeRegistry$getType = typeRegistry.getType(type)) === null || _typeRegistry$getType === void 0 ? void 0 : (_typeRegistry$getType2 = _typeRegistry$getType.management) === null || _typeRegistry$getType2 === void 0 ? void 0 : _typeRegistry$getType2.icon
    };
    const attemptedOverwrite = pendingOverwrites.has(`${type}:${id}`);
    return {
      type,
      id,
      meta,
      ...(attemptedOverwrite && {
        overwrite: true
      }),
      ...(destinationId && {
        destinationId
      }),
      ...(destinationId && !originId && !createNewCopies && {
        createNewCopy: true
      })
    };
  });
  const errorResults = errorAccumulator.map(error => {
    var _typeRegistry$getType3, _typeRegistry$getType4;

    const icon = (_typeRegistry$getType3 = typeRegistry.getType(error.type)) === null || _typeRegistry$getType3 === void 0 ? void 0 : (_typeRegistry$getType4 = _typeRegistry$getType3.management) === null || _typeRegistry$getType4 === void 0 ? void 0 : _typeRegistry$getType4.icon;
    const attemptedOverwrite = pendingOverwrites.has(`${error.type}:${error.id}`);
    return { ...error,
      meta: { ...error.meta,
        icon
      },
      ...(attemptedOverwrite && {
        overwrite: true
      })
    };
  });
  return {
    successCount: createSavedObjectsResult.createdObjects.length,
    success: errorAccumulator.length === 0,
    ...(successResults.length && {
      successResults
    }),
    ...(errorResults.length && {
      errors: errorResults
    })
  };
}