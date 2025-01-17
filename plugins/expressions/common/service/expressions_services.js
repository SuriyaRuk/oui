"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionsService = void 0;

var _executor2 = require("../executor");

var _expression_renderers = require("../expression_renderers");

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

/**
 * The public contract that `ExpressionsService` provides to other plugins
 * in OpenSearch Dashboards Platform in *setup* life-cycle.
 */

/**
 * The public contract that `ExpressionsService` provides to other plugins
 * in OpenSearch Dashboards Platform in *start* life-cycle.
 */

/**
 * `ExpressionsService` class is used for multiple purposes:
 *
 * 1. It implements the same Expressions service that can be used on both:
 *    (1) server-side and (2) browser-side.
 * 2. It implements the same Expressions service that users can fork/clone,
 *    thus have their own instance of the Expressions plugin.
 * 3. `ExpressionsService` defines the public contracts of *setup* and *start*
 *    OpenSearch Dashboards Platform life-cycles for ease-of-use on server-side and browser-side.
 * 4. `ExpressionsService` creates a bound version of all exported contract functions.
 * 5. Functions are bound the way there are:
 *
 *    ```ts
 *    registerFunction = (...args: Parameters<Executor['registerFunction']>
 *      ): ReturnType<Executor['registerFunction']> => this.executor.registerFunction(...args);
 *    ```
 *
 *    so that JSDoc appears in developers IDE when they use those `plugins.expressions.registerFunction(`.
 */
class ExpressionsService {
  constructor({
    executor: _executor = _executor2.Executor.createWithDefaults(),
    renderers: _renderers = new _expression_renderers.ExpressionRendererRegistry()
  } = {}) {
    _defineProperty(this, "executor", void 0);

    _defineProperty(this, "renderers", void 0);

    _defineProperty(this, "registerFunction", (...args) => this.executor.registerFunction(...args));

    _defineProperty(this, "registerType", (...args) => this.executor.registerType(...args));

    _defineProperty(this, "registerRenderer", (...args) => this.renderers.register(...args));

    _defineProperty(this, "run", (ast, input, context) => this.executor.run(ast, input, context));

    _defineProperty(this, "getFunction", name => this.executor.getFunction(name));

    _defineProperty(this, "getFunctions", () => this.executor.getFunctions());

    _defineProperty(this, "getRenderer", name => this.renderers.get(name));

    _defineProperty(this, "getRenderers", () => this.renderers.toJS());

    _defineProperty(this, "getType", name => this.executor.getType(name));

    _defineProperty(this, "getTypes", () => this.executor.getTypes());

    _defineProperty(this, "execute", (ast, // This any is for legacy reasons.
    input = {
      type: 'null'
    }, context) => {
      const execution = this.executor.createExecution(ast, context);
      execution.start(input);
      return execution.contract;
    });

    _defineProperty(this, "fork", () => {
      const executor = this.executor.fork();
      const renderers = this.renderers;
      const fork = new ExpressionsService({
        executor,
        renderers
      });
      return fork;
    });

    this.executor = _executor;
    this.renderers = _renderers;
  }
  /**
   * Register an expression function, which will be possible to execute as
   * part of the expression pipeline.
   *
   * Below we register a function which simply sleeps for given number of
   * milliseconds to delay the execution and outputs its input as-is.
   *
   * ```ts
   * expressions.registerFunction({
   *   name: 'sleep',
   *   args: {
   *     time: {
   *       aliases: ['_'],
   *       help: 'Time in milliseconds for how long to sleep',
   *       types: ['number'],
   *     },
   *   },
   *   help: '',
   *   fn: async (input, args, context) => {
   *     await new Promise(r => setTimeout(r, args.time));
   *     return input;
   *   },
   * }
   * ```
   *
   * The actual function is defined in the `fn` key. The function can be *async*.
   * It receives three arguments: (1) `input` is the output of the previous function
   * or the initial input of the expression if the function is first in chain;
   * (2) `args` are function arguments as defined in expression string, that can
   * be edited by user (e.g in case of Canvas); (3) `context` is a shared object
   * passed to all functions that can be used for side-effects.
   */

  /**
   * Executes expression string or a parsed expression AST and immediately
   * returns the result.
   *
   * Below example will execute `sleep 100 | clog` expression with `123` initial
   * input to the first function.
   *
   * ```ts
   * expressions.run('sleep 100 | clog', 123);
   * ```
   *
   * - `sleep 100` will delay execution by 100 milliseconds and pass the `123` input as
   *   its output.
   * - `clog` will print to console `123` and pass it as its output.
   * - The final result of the execution will be `123`.
   *
   * Optionally, you can pass an object as the third argument which will be used
   * to extend the `ExecutionContext`&mdash;an object passed to each function
   * as the third argument, that allows functions to perform side-effects.
   *
   * ```ts
   * expressions.run('...', null, { opensearchClient });
   * ```
   */

  /**
   * Get a registered `ExpressionFunction` by its name, which was registered
   * using the `registerFunction` method. The returned `ExpressionFunction`
   * instance is an internal representation of the function in Expressions
   * service - do not mutate that object.
   */

  /**
   * Returns POJO map of all registered expression functions, where keys are
   * names of the functions and values are `ExpressionFunction` instances.
   */

  /**
   * Get a registered `ExpressionRenderer` by its name, which was registered
   * using the `registerRenderer` method. The returned `ExpressionRenderer`
   * instance is an internal representation of the renderer in Expressions
   * service - do not mutate that object.
   */

  /**
   * Returns POJO map of all registered expression renderers, where keys are
   * names of the renderers and values are `ExpressionRenderer` instances.
   */

  /**
   * Get a registered `ExpressionType` by its name, which was registered
   * using the `registerType` method. The returned `ExpressionType`
   * instance is an internal representation of the type in Expressions
   * service - do not mutate that object.
   */

  /**
   * Returns POJO map of all registered expression types, where keys are
   * names of the types and values are `ExpressionType` instances.
   */

  /**
   * Starts expression execution and immediately returns `ExecutionContract`
   * instance that tracks the progress of the execution and can be used to
   * interact with the execution.
   */

  /**
   * Create a new instance of `ExpressionsService`. The new instance inherits
   * all state of the original `ExpressionsService`, including all expression
   * types, expression functions and context. Also, all new types and functions
   * registered in the original services AFTER the forking event will be
   * available in the forked instance. However, all new types and functions
   * registered in the forked instances will NOT be available to the original
   * service.
   */


  /**
   * Returns OpenSearch Dashboards Platform *setup* life-cycle contract. Useful to return the
   * same contract on server-side and browser-side.
   */
  setup() {
    return this;
  }
  /**
   * Returns OpenSearch Dashboards Platform *start* life-cycle contract. Useful to return the
   * same contract on server-side and browser-side.
   */


  start() {
    return this;
  }

  stop() {}

}

exports.ExpressionsService = ExpressionsService;