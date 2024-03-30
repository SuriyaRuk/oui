"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLUGIN_NAME = exports.PLUGIN_ID = exports.EDIT_PATH = void 0;
Object.defineProperty(exports, "VISBUILDER_SAVED_OBJECT", {
  enumerable: true,
  get: function () {
    return _vis_builder_saved_object_attributes.VISBUILDER_SAVED_OBJECT;
  }
});
exports.VIS_BUILDER_CHART_TYPE = exports.VISUALIZE_ID = void 0;
Object.defineProperty(exports, "VisBuilderSavedObjectAttributes", {
  enumerable: true,
  get: function () {
    return _vis_builder_saved_object_attributes.VisBuilderSavedObjectAttributes;
  }
});

var _vis_builder_saved_object_attributes = require("./vis_builder_saved_object_attributes");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const PLUGIN_ID = 'vis-builder';
exports.PLUGIN_ID = PLUGIN_ID;
const PLUGIN_NAME = 'VisBuilder';
exports.PLUGIN_NAME = PLUGIN_NAME;
const VISUALIZE_ID = 'visualize';
exports.VISUALIZE_ID = VISUALIZE_ID;
const EDIT_PATH = '/edit';
exports.EDIT_PATH = EDIT_PATH;
const VIS_BUILDER_CHART_TYPE = 'VisBuilder';
exports.VIS_BUILDER_CHART_TYPE = VIS_BUILDER_CHART_TYPE;