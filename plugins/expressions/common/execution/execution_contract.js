"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecutionContract = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/**
 * `ExecutionContract` is a wrapper around `Execution` class. It provides the
 * same functionality but does not expose Expressions plugin internals.
 */
class ExecutionContract {
  get isPending() {
    const state = this.execution.state.get().state;
    const finished = state === 'error' || state === 'result';
    return !finished;
  }

  constructor(execution) {
    this.execution = execution;

    _defineProperty(this, "cancel", () => {
      this.execution.cancel();
    });

    _defineProperty(this, "getData", async () => {
      try {
        return await this.execution.result;
      } catch (e) {
        return {
          type: 'error',
          error: {
            type: e.type,
            message: e.message,
            stack: e.stack
          }
        };
      }
    });

    _defineProperty(this, "getExpression", () => {
      return this.execution.expression;
    });

    _defineProperty(this, "getAst", () => this.execution.state.get().ast);

    _defineProperty(this, "inspect", () => this.execution.inspectorAdapters);
  }
  /**
   * Cancel the execution of the expression. This will set abort signal
   * (available in execution context) to aborted state, letting expression
   * functions to stop their execution.
   */

  /**
   * Returns the final output of expression, if any error happens still
   * wraps that error into `ExpressionValueError` type and returns that.
   * This function never throws.
   */

  /**
   * Get string representation of the expression. Returns the original string
   * if execution was started from a string. If execution was started from an
   * AST this method returns a string generated from AST.
   */

  /**
   * Get AST used to execute the expression.
   */

  /**
   * Get Inspector adapters provided to all functions of expression through
   * execution context.
   */


}

exports.ExecutionContract = ExecutionContract;