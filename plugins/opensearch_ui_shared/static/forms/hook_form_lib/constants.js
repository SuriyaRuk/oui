"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALIDATION_TYPES = exports.FIELD_TYPES = void 0;

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
// Field types
const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  TOGGLE: 'toggle',
  CHECKBOX: 'checkbox',
  COMBO_BOX: 'comboBox',
  RADIO_GROUP: 'radioGroup',
  RANGE: 'range',
  SELECT: 'select',
  SUPER_SELECT: 'superSelect',
  MULTI_SELECT: 'multiSelect',
  JSON: 'json'
}; // Validation types

exports.FIELD_TYPES = FIELD_TYPES;
const VALIDATION_TYPES = {
  /** Default validation error (on the field value) */
  FIELD: 'field',

  /** Returned from asynchronous validations */
  ASYNC: 'async',

  /** If the field value is an Array, this error type would be returned if an _item_ of the array is invalid */
  ARRAY_ITEM: 'arrayItem'
};
exports.VALIDATION_TYPES = VALIDATION_TYPES;