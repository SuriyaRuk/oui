"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stubIndexPatternWithFields = exports.stubIndexPattern = void 0;

var _field = require("./field.stub");

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
const stubIndexPattern = {
  id: 'logstash-*',
  fields: _field.stubFields,
  title: 'logstash-*',
  timeFieldName: '@timestamp'
};
exports.stubIndexPattern = stubIndexPattern;
const stubIndexPatternWithFields = {
  id: '1234',
  title: 'logstash-*',
  fields: [{
    name: 'response',
    type: 'number',
    esTypes: ['integer'],
    aggregatable: true,
    filterable: true,
    searchable: true
  }]
};
exports.stubIndexPatternWithFields = stubIndexPatternWithFields;