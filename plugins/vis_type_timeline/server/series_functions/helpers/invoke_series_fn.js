"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invokeSeriesFn;

var _lodash = _interopRequireDefault(require("lodash"));

var _index_arguments = _interopRequireDefault(require("../../handlers/lib/index_arguments"));

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
// invokes a series_function with the specified arguments
function invokeSeriesFn(fnDef, args, tlConfigOverrides) {
  const tlConfig = _lodash.default.merge(require('../fixtures/tl_config')(), tlConfigOverrides);

  return Promise.all(args).then(function (args) {
    args.byName = (0, _index_arguments.default)(fnDef, args);

    const input = _lodash.default.cloneDeep(args);

    return Promise.resolve(fnDef.originalFn(args, tlConfig)).then(function (output) {
      const result = {
        output: output,
        input: input
      };
      return result;
    });
  });
}

module.exports = exports.default;