"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preProcessChainFn;

var _lodash = _interopRequireDefault(require("lodash"));

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
function preProcessChainFn(tlConfig) {
  return function preProcessChain(chain, queries) {
    queries = queries || {};

    function validateAndStore(item) {
      if (_lodash.default.isObject(item) && item.type === 'function') {
        const functionDef = tlConfig.getFunction(item.function);

        if (functionDef.datasource) {
          queries[functionDef.cacheKey(item)] = item;
          return true;
        }

        return false;
      }
    } // Is this thing a function?


    if (validateAndStore(chain)) {
      return;
    }

    if (!Array.isArray(chain)) return;

    _lodash.default.each(chain, function (operator) {
      if (!_lodash.default.isObject(operator)) {
        return;
      }

      switch (operator.type) {
        case 'chain':
          preProcessChain(operator.chain, queries);
          break;

        case 'chainList':
          preProcessChain(operator.list, queries);
          break;

        case 'function':
          if (validateAndStore(operator)) {
            break;
          } else {
            preProcessChain(operator.arguments, queries);
          }

          break;
      }
    });

    return queries;
  };
}

module.exports = exports.default;