"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLUGIN_AUGMENTATION_MAX_OBJECTS_SETTING = exports.PLUGIN_AUGMENTATION_ENABLE_SETTING = exports.APP_PATH = exports.APP_API = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const APP_PATH = {
  STATS: '/stats'
};
exports.APP_PATH = APP_PATH;
const APP_API = '/api/vis_augmenter';
exports.APP_API = APP_API;
const PLUGIN_AUGMENTATION_ENABLE_SETTING = 'visualization:enablePluginAugmentation';
exports.PLUGIN_AUGMENTATION_ENABLE_SETTING = PLUGIN_AUGMENTATION_ENABLE_SETTING;
const PLUGIN_AUGMENTATION_MAX_OBJECTS_SETTING = 'visualization:enablePluginAugmentation.maxPluginObjects';
exports.PLUGIN_AUGMENTATION_MAX_OBJECTS_SETTING = PLUGIN_AUGMENTATION_MAX_OBJECTS_SETTING;