"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionRenderer = void 0;

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
class ExpressionRenderer {
  constructor(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "displayName", void 0);

    _defineProperty(this, "help", void 0);

    _defineProperty(this, "validate", void 0);

    _defineProperty(this, "reuseDomNode", void 0);

    _defineProperty(this, "render", void 0);

    const {
      name,
      displayName,
      help,
      validate,
      reuseDomNode,
      render
    } = config;
    this.name = name;
    this.displayName = displayName || name;
    this.help = help || '';

    this.validate = validate || (() => {});

    this.reuseDomNode = Boolean(reuseDomNode);
    this.render = render;
  }

}

exports.ExpressionRenderer = ExpressionRenderer;