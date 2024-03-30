"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisBuilderPlugin = void 0;

var _capabilities_provider = require("./capabilities_provider");

var _saved_objects = require("./saved_objects");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Copyright OpenSearch Contributors
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   */

class VisBuilderPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get();
  }

  setup({
    capabilities,
    http,
    savedObjects
  }) {
    this.logger.debug('vis-builder: Setup'); // Register saved object types

    savedObjects.registerType(_saved_objects.visBuilderSavedObjectType); // Register capabilities

    capabilities.registerProvider(_capabilities_provider.capabilitiesProvider);
    return {};
  }

  start(_core) {
    this.logger.debug('vis-builder: Started');
    return {};
  }

  stop() {}

}

exports.VisBuilderPlugin = VisBuilderPlugin;