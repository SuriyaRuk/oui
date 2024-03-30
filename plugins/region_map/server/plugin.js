"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionMapPlugin = void 0;

var _routes = require("../server/routes");

var _ui_settings = require("./ui_settings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Copyright OpenSearch Contributors
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   */

class RegionMapPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get();
  }

  setup(core) {
    this.logger.debug('RegionMap: Setup');
    const router = core.http.createRouter();
    core.uiSettings.register((0, _ui_settings.getUiSettings)());
    (0, _routes.registerGeospatialRoutes)(router);
    return {};
  }

  start(_core) {
    this.logger.debug('RegionMap: Started');
    return {};
  }

  stop() {}

}

exports.RegionMapPlugin = RegionMapPlugin;