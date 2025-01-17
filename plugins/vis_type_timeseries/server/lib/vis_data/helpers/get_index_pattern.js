"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPatternObject = getIndexPatternObject;

var _lodash = require("lodash");

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
async function getIndexPatternObject(req, indexPatternString) {
  let defaultIndex;

  if (!indexPatternString) {
    defaultIndex = await req.getUiSettingsService().get('defaultIndex');
  } // getting the matching index pattern


  const savedObjectClient = req.getSavedObjectsClient();
  const indexPatternObjects = await savedObjectClient.find({
    type: 'index-pattern',
    fields: ['title', 'fields', 'timeFieldName'],
    search: indexPatternString ? `"${indexPatternString}"` : null,
    search_fields: ['title']
  }); // getting the index pattern fields

  const indexPatterns = indexPatternObjects.saved_objects.filter(obj => obj.attributes.title === indexPatternString || defaultIndex && obj.id === defaultIndex).map(indexPattern => {
    const {
      title,
      fields,
      timeFieldName
    } = indexPattern.attributes;
    return {
      title,
      timeFieldName,
      fields: JSON.parse(fields)
    };
  });
  const indexPatternObject = indexPatterns.length === 1 ? indexPatterns[0] : null;
  return {
    indexPatternObject,
    indexPatternString: indexPatternString || (0, _lodash.get)(indexPatternObject, 'title', '')
  };
}