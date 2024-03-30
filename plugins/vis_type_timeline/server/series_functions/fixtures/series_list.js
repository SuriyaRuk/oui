"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bucket_list = _interopRequireDefault(require("./bucket_list"));

var _get_series = _interopRequireDefault(require("../helpers/get_series"));

var _get_series_list = _interopRequireDefault(require("../helpers/get_series_list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function _default() {
  return (0, _get_series_list.default)([(0, _get_series.default)('Negative', _bucket_list.default, [-51, 17, 82, 20]), (0, _get_series.default)('Nice', _bucket_list.default, [100, 50, 50, 20]), (0, _get_series.default)('All the same', _bucket_list.default, [1, 1, 1, 1]), (0, _get_series.default)('Decimals', _bucket_list.default, [3.1415926535, 2, 1.439, 0.3424235]), (0, _get_series.default)('PowerOfTen', _bucket_list.default, [10, 100, 10, 1])]);
}

module.exports = exports.default;