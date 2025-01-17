"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoolFormat = void 0;

var _i18n = require("@osd/i18n");

var _types = require("../../osd_field_types/types");

var _field_format = require("../field_format");

var _types2 = require("../types");

var _utils = require("../utils");

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

class BoolFormat extends _field_format.FieldFormat {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "textConvert", value => {
      if (typeof value === 'string') {
        value = value.trim().toLowerCase();
      }

      switch (value) {
        case false:
        case 0:
        case 'false':
        case 'no':
          return 'false';

        case true:
        case 1:
        case 'true':
        case 'yes':
          return 'true';

        default:
          return (0, _utils.asPrettyString)(value);
      }
    });
  }

}

exports.BoolFormat = BoolFormat;

_defineProperty(BoolFormat, "id", _types2.FIELD_FORMAT_IDS.BOOLEAN);

_defineProperty(BoolFormat, "title", _i18n.i18n.translate('data.fieldFormats.boolean.title', {
  defaultMessage: 'Boolean'
}));

_defineProperty(BoolFormat, "fieldType", [_types.OSD_FIELD_TYPES.BOOLEAN, _types.OSD_FIELD_TYPES.NUMBER, _types.OSD_FIELD_TYPES.STRING]);