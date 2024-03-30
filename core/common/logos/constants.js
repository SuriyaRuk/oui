"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageType = exports.ColorScheme = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
let ImageType;
exports.ImageType = ImageType;

(function (ImageType) {
  ImageType["DEFAULT"] = "default";
  ImageType["CUSTOM"] = "custom";
  ImageType["ALTERNATIVE"] = "alternative";
})(ImageType || (exports.ImageType = ImageType = {}));

let ColorScheme;
exports.ColorScheme = ColorScheme;

(function (ColorScheme) {
  ColorScheme["LIGHT"] = "light";
  ColorScheme["DARK"] = "dark";
})(ColorScheme || (exports.ColorScheme = ColorScheme = {}));