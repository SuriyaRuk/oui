"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpsMetricsCollector = void 0;

var _collectors = require("./collectors");

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

class OpsMetricsCollector {
  constructor(server, opsOptions) {
    _defineProperty(this, "processCollector", void 0);

    _defineProperty(this, "osCollector", void 0);

    _defineProperty(this, "serverCollector", void 0);

    this.processCollector = new _collectors.ProcessMetricsCollector();
    this.osCollector = new _collectors.OsMetricsCollector(opsOptions);
    this.serverCollector = new _collectors.ServerMetricsCollector(server);
  }

  async collect() {
    const [process, os, server] = await Promise.all([this.processCollector.collect(), this.osCollector.collect(), this.serverCollector.collect()]);
    return {
      collected_at: new Date(),
      process,
      os,
      ...server
    };
  }

  reset() {
    this.processCollector.reset();
    this.osCollector.reset();
    this.serverCollector.reset();
  }

}

exports.OpsMetricsCollector = OpsMetricsCollector;