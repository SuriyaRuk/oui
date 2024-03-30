"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsUtils = exports.FIND_DEFAULT_PER_PAGE = exports.FIND_DEFAULT_PAGE = exports.DEFAULT_NAMESPACE_STRING = exports.ALL_NAMESPACES_STRING = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
const DEFAULT_NAMESPACE_STRING = 'default';
exports.DEFAULT_NAMESPACE_STRING = DEFAULT_NAMESPACE_STRING;
const ALL_NAMESPACES_STRING = '*';
exports.ALL_NAMESPACES_STRING = ALL_NAMESPACES_STRING;
const FIND_DEFAULT_PAGE = 1;
exports.FIND_DEFAULT_PAGE = FIND_DEFAULT_PAGE;
const FIND_DEFAULT_PER_PAGE = 20;
/**
 * @public
 */

exports.FIND_DEFAULT_PER_PAGE = FIND_DEFAULT_PER_PAGE;

class SavedObjectsUtils {}

exports.SavedObjectsUtils = SavedObjectsUtils;

_defineProperty(SavedObjectsUtils, "namespaceIdToString", namespace => {
  if (namespace === '') {
    throw new TypeError('namespace cannot be an empty string');
  }

  return namespace !== null && namespace !== void 0 ? namespace : DEFAULT_NAMESPACE_STRING;
});

_defineProperty(SavedObjectsUtils, "namespaceStringToId", namespace => {
  if (!namespace) {
    throw new TypeError('namespace must be a non-empty string');
  }

  return namespace !== DEFAULT_NAMESPACE_STRING ? namespace : undefined;
});

_defineProperty(SavedObjectsUtils, "createEmptyFindResponse", ({
  page = FIND_DEFAULT_PAGE,
  perPage = FIND_DEFAULT_PER_PAGE
}) => ({
  page,
  per_page: perPage,
  total: 0,
  saved_objects: []
}));