"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelativeDateFormat = void 0;

var _i18n = require("@osd/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _types = require("../../osd_field_types/types");

var _field_format = require("../field_format");

var _types2 = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

class RelativeDateFormat extends _field_format.FieldFormat {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "textConvert", val => {
      if (val === null || val === undefined) {
        return '-';
      }

      const date = (0, _moment.default)(val);

      if (date.isValid()) {
        return date.fromNow();
      } else {
        return val;
      }
    });
  }

}

exports.RelativeDateFormat = RelativeDateFormat;

_defineProperty(RelativeDateFormat, "id", _types2.FIELD_FORMAT_IDS.RELATIVE_DATE);

_defineProperty(RelativeDateFormat, "title", _i18n.i18n.translate('data.fieldFormats.relative_date.title', {
  defaultMessage: 'Relative date'
}));

_defineProperty(RelativeDateFormat, "fieldType", _types.OSD_FIELD_TYPES.DATE);