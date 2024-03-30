"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFormatsService = void 0;

var _lodash = require("lodash");

var _field_formats = require("../../common/field_formats");

var _converters = require("./converters");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * The OpenSearch Contributors require contributions made to
                                                                                                                                                                                                                   * this file be licensed under the Apache-2.0 license or a
                                                                                                                                                                                                                   * compatible open source license.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Any modifications Copyright OpenSearch Contributors. See
                                                                                                                                                                                                                   * GitHub history for details.
                                                                                                                                                                                                                   */ /*
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

class FieldFormatsService {
  constructor() {
    _defineProperty(this, "fieldFormatClasses", [_converters.DateFormat, _converters.DateNanosFormat, ..._field_formats.baseFormatters]);
  }

  setup() {
    return {
      register: customFieldFormat => this.fieldFormatClasses.push(customFieldFormat)
    };
  }

  start() {
    return {
      fieldFormatServiceFactory: async uiSettings => {
        const fieldFormatsRegistry = new _field_formats.FieldFormatsRegistry();
        const uiConfigs = await uiSettings.getAll();
        const registeredUiSettings = uiSettings.getRegistered();
        Object.keys(registeredUiSettings).forEach(key => {
          if ((0, _lodash.has)(uiConfigs, key) && registeredUiSettings[key].type === 'json') {
            uiConfigs[key] = JSON.parse(uiConfigs[key]);
          }
        });
        fieldFormatsRegistry.init(key => uiConfigs[key], {}, this.fieldFormatClasses);
        return fieldFormatsRegistry;
      }
    };
  }

}
/** @public */

/** @public */


exports.FieldFormatsService = FieldFormatsService;