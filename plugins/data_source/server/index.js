"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataSourcePluginSetup", {
  enumerable: true,
  get: function () {
    return _types.DataSourcePluginSetup;
  }
});
Object.defineProperty(exports, "DataSourcePluginStart", {
  enumerable: true,
  get: function () {
    return _types.DataSourcePluginStart;
  }
});
exports.config = void 0;
exports.plugin = plugin;

var _plugin = require("./plugin");

var _config = require("../config");

var _types = require("./types");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const config = {
  schema: _config.configSchema
};
exports.config = config;

function plugin(initializerContext) {
  return new _plugin.DataSourcePlugin(initializerContext);
}