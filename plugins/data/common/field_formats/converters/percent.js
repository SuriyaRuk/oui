"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PercentFormat = void 0;

var _i18n = require("@osd/i18n");

var _numeral = require("./numeral");

var _types = require("../types");

var _constants = require("../../constants");

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

class PercentFormat extends _numeral.NumeralFormat {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", PercentFormat.id);

    _defineProperty(this, "title", PercentFormat.title);

    _defineProperty(this, "allowsNumericalAggregations", true);

    _defineProperty(this, "getParamDefaults", () => ({
      pattern: this.getConfig(_constants.UI_SETTINGS.FORMAT_PERCENT_DEFAULT_PATTERN),
      fractional: true
    }));

    _defineProperty(this, "textConvert", val => {
      const formatted = super.getConvertedValue(val);

      if (this.param('fractional')) {
        return formatted;
      }

      return String(Number(formatted) / 100);
    });
  }

}

exports.PercentFormat = PercentFormat;

_defineProperty(PercentFormat, "id", _types.FIELD_FORMAT_IDS.PERCENT);

_defineProperty(PercentFormat, "title", _i18n.i18n.translate('data.fieldFormats.percent.title', {
  defaultMessage: 'Percentage'
}));