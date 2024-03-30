"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionFunction = void 0;

var _expression_function_parameter = require("./expression_function_parameter");

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

class ExpressionFunction {
  /**
   * Name of function
   */

  /**
   * Aliases that can be used instead of `name`.
   */

  /**
   * Return type of function. This SHOULD be supplied. We use it for UI
   * and autocomplete hinting. We may also use it for optimizations in
   * the future.
   */

  /**
   * Function to run function (context, args)
   */

  /**
   * A short help text.
   */

  /**
   * Specification of expression function parameters.
   */

  /**
   * Type of inputs that this function supports.
   */
  constructor(functionDefinition) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "aliases", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "fn", void 0);

    _defineProperty(this, "help", void 0);

    _defineProperty(this, "args", {});

    _defineProperty(this, "inputTypes", void 0);

    _defineProperty(this, "accepts", type => {
      // If you don't tell us input types, we'll assume you don't care what you get.
      if (!this.inputTypes) return true;
      return this.inputTypes.indexOf(type) > -1;
    });

    const {
      name,
      type: _type,
      aliases,
      fn,
      help,
      args,
      inputTypes,
      context
    } = functionDefinition;
    this.name = name;
    this.type = _type;
    this.aliases = aliases || [];

    this.fn = (input, params, handlers) => Promise.resolve(fn(input, params, handlers));

    this.help = help || '';
    this.inputTypes = inputTypes || (context === null || context === void 0 ? void 0 : context.types);

    for (const [key, arg] of Object.entries(args || {})) {
      this.args[key] = new _expression_function_parameter.ExpressionFunctionParameter(key, arg);
    }
  }

}

exports.ExpressionFunction = ExpressionFunction;