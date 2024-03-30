"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsManagementPlugin = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _services = require("./services");

var _routes = require("./routes");

var _capabilities_provider = require("./capabilities_provider");

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

class SavedObjectsManagementPlugin {
  constructor(context) {
    this.context = context;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "managementService$", new _rxjs.Subject());

    this.logger = this.context.logger.get();
  }

  async setup({
    http,
    capabilities
  }) {
    this.logger.debug('Setting up SavedObjectsManagement plugin');
    (0, _routes.registerRoutes)({
      http,
      managementServicePromise: this.managementService$.pipe((0, _operators.first)()).toPromise()
    });
    capabilities.registerProvider(_capabilities_provider.capabilitiesProvider);
    return {};
  }

  async start(core) {
    this.logger.debug('Starting up SavedObjectsManagement plugin');
    const managementService = new _services.SavedObjectsManagement(core.savedObjects.getTypeRegistry());
    this.managementService$.next(managementService);
    return {};
  }

}

exports.SavedObjectsManagementPlugin = SavedObjectsManagementPlugin;