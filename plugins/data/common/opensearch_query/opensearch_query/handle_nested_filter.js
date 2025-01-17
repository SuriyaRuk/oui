"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNestedFilter = void 0;

var _filters = require("../filters");

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
const handleNestedFilter = (filter, indexPattern) => {
  if (!indexPattern) return filter;
  const fieldName = (0, _filters.getFilterField)(filter);

  if (!fieldName) {
    return filter;
  }

  const field = indexPattern.fields.find(indexPatternField => indexPatternField.name === fieldName);

  if (!field || !field.subType || !field.subType.nested || !field.subType.nested.path) {
    return filter;
  }

  const query = (0, _filters.cleanFilter)(filter);
  return {
    meta: filter.meta,
    nested: {
      path: field.subType.nested.path,
      query: query.query || query
    }
  };
};

exports.handleNestedFilter = handleNestedFilter;