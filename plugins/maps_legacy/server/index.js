"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = exports.config = exports.MapsLegacyPlugin = void 0;

var _config = require("../config");

var _ui_settings = require("./ui_settings");

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

const config = {
  exposeToBrowser: {
    includeOpenSearchMapsService: true,
    proxyOpenSearchMapsServiceInMaps: true,
    showRegionDeniedWarning: true,
    tilemap: true,
    regionmap: true,
    manifestServiceUrl: true,
    opensearchManifestServiceUrl: true,
    emsFileApiUrl: true,
    emsTileApiUrl: true,
    emsLandingPageUrl: true,
    emsFontLibraryUrl: true,
    emsTileLayerId: true
  },
  schema: _config.configSchema,
  deprecations: ({
    renameFromRoot
  }) => [renameFromRoot('map.includeElasticMapsService', 'map.includeOpenSearchMapsService'), renameFromRoot('map.proxyOpenSearchMapsServiceInMaps', 'map.proxyElasticMapsServiceInMaps'), renameFromRoot('map.regionmap.includeElasticMapsService', 'map.regionmap.includeOpenSearchMapsService'), renameFromRoot('map.showRegionBlockedWarning', 'map.showRegionDeniedWarning')]
};
exports.config = config;

class MapsLegacyPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "_initializerContext", void 0);

    this._initializerContext = initializerContext;
  }

  setup(core) {
    core.uiSettings.register((0, _ui_settings.getUiSettings)()); // @ts-ignore

    const config$ = this._initializerContext.config.create();

    return {
      config$
    };
  }

  start() {}

}

exports.MapsLegacyPlugin = MapsLegacyPlugin;

const plugin = initializerContext => new MapsLegacyPlugin(initializerContext);

exports.plugin = plugin;