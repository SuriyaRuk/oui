"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigManager = void 0;

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
class ConfigManager {
  constructor(config) {
    _defineProperty(this, "opensearchShardTimeout", 0);

    _defineProperty(this, "graphiteAllowedUrls", []);

    _defineProperty(this, "graphiteBlockedIPs", []);

    config.create().subscribe(configUpdate => {
      this.graphiteAllowedUrls = configUpdate.graphiteAllowedUrls || [];
      this.graphiteBlockedIPs = configUpdate.graphiteBlockedIPs || [];
    });
    config.legacy.globalConfig$.subscribe(configUpdate => {
      this.opensearchShardTimeout = configUpdate.opensearch.shardTimeout.asMilliseconds();
    });
  }

  getOpenSearchShardTimeout() {
    return this.opensearchShardTimeout;
  }

  getGraphiteAllowedUrls() {
    return this.graphiteAllowedUrls;
  }

  getGraphiteBlockedIPs() {
    return this.graphiteBlockedIPs;
  }

}

exports.ConfigManager = ConfigManager;