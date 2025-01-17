"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRelationshipsRoute = void 0;

var _configSchema = require("@osd/config-schema");

var _lib = require("../lib");

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
const registerRelationshipsRoute = (router, managementServicePromise) => {
  router.get({
    path: '/api/opensearch-dashboards/management/saved_objects/relationships/{type}/{id}',
    validate: {
      params: _configSchema.schema.object({
        type: _configSchema.schema.string(),
        id: _configSchema.schema.string()
      }),
      query: _configSchema.schema.object({
        size: _configSchema.schema.number({
          defaultValue: 10000
        }),
        savedObjectTypes: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())])
      })
    }
  }, router.handleLegacyErrors(async (context, req, res) => {
    const managementService = await managementServicePromise;
    const {
      client
    } = context.core.savedObjects;
    const {
      type,
      id
    } = req.params;
    const {
      size
    } = req.query;
    const savedObjectTypes = Array.isArray(req.query.savedObjectTypes) ? req.query.savedObjectTypes : [req.query.savedObjectTypes];
    const relations = await (0, _lib.findRelationships)({
      type,
      id,
      client,
      size,
      referenceTypes: savedObjectTypes,
      savedObjectsManagement: managementService
    });
    return res.ok({
      body: relations
    });
  }));
};

exports.registerRelationshipsRoute = registerRelationshipsRoute;