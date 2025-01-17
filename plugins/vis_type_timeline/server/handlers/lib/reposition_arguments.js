"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = repositionArguments;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@osd/i18n");

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
// Applies to unresolved arguments in the AST
function repositionArguments(functionDef, unorderedArgs) {
  const args = [];

  _lodash.default.each(unorderedArgs, function (unorderedArg, i) {
    let argDef;
    let targetIndex;
    let value;
    let storeAsArray;

    if (_lodash.default.isObject(unorderedArg) && unorderedArg.type === 'namedArg') {
      argDef = functionDef.argsByName[unorderedArg.name];

      if (!argDef) {
        if (functionDef.extended) {
          const namesIndex = functionDef.args.length;
          targetIndex = functionDef.args.length + 1;
          args[namesIndex] = args[namesIndex] || [];
          args[namesIndex].push(unorderedArg.name);
          argDef = functionDef.extended;
          storeAsArray = true;
        }
      } else {
        targetIndex = _lodash.default.findIndex(functionDef.args, function (orderedArg) {
          return unorderedArg.name === orderedArg.name;
        });
        storeAsArray = argDef.multi;
      }

      value = unorderedArg.value;
    } else {
      argDef = functionDef.args[i];
      storeAsArray = argDef.multi;
      targetIndex = i;
      value = unorderedArg;
    }

    if (!argDef) {
      throw new Error(_i18n.i18n.translate('timeline.serverSideErrors.unknownArgumentErrorMessage', {
        defaultMessage: 'Unknown argument to {functionName}: {argumentName}',
        values: {
          functionName: functionDef.name,
          argumentName: unorderedArg.name || '#' + i
        }
      }));
    }

    if (storeAsArray) {
      args[targetIndex] = args[targetIndex] || [];
      args[targetIndex].push(value);
    } else {
      args[targetIndex] = value;
    }
  });

  return args;
}

module.exports = exports.default;