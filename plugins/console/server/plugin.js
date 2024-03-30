"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleServerPlugin = void 0;

var _operators = require("rxjs/operators");

var _lib = require("./lib");

var _services = require("./services");

var _routes = require("./routes");

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

class ConsoleServerPlugin {
  constructor(ctx) {
    this.ctx = ctx;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "specDefinitionsService", new _services.SpecDefinitionsService());

    _defineProperty(this, "opensearchLegacyConfigService", new _services.OpenSearchLegacyConfigService());

    this.log = this.ctx.logger.get();
  }

  async setup({
    http,
    capabilities,
    getStartServices,
    opensearch
  }) {
    capabilities.registerProvider(() => ({
      dev_tools: {
        show: true,
        save: true
      }
    }));
    const config = await this.ctx.config.create().pipe((0, _operators.first)()).toPromise();
    const globalConfig = await this.ctx.config.legacy.globalConfig$.pipe((0, _operators.first)()).toPromise();
    const proxyPathFilters = config.proxyFilter.map(str => new RegExp(str));
    this.opensearchLegacyConfigService.setup(opensearch.legacy.config$);
    const router = http.createRouter();
    (0, _routes.registerRoutes)({
      router,
      log: this.log,
      services: {
        opensearchLegacyConfigService: this.opensearchLegacyConfigService,
        specDefinitionService: this.specDefinitionsService
      },
      proxy: {
        proxyConfigCollection: new _lib.ProxyConfigCollection(config.proxyConfig),
        readLegacyOpenSearchConfig: async () => {
          const legacyConfig = await this.opensearchLegacyConfigService.readConfig();
          return { ...globalConfig.opensearch,
            ...legacyConfig
          };
        },
        pathFilters: proxyPathFilters
      }
    });
    return { ...this.specDefinitionsService.setup()
    };
  }

  start() {
    return { ...this.specDefinitionsService.start()
    };
  }

  stop() {
    this.opensearchLegacyConfigService.stop();
  }

}

exports.ConsoleServerPlugin = ConsoleServerPlugin;