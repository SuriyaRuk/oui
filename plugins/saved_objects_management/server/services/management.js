"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsManagement = void 0;

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
class SavedObjectsManagement {
  constructor(registry) {
    this.registry = registry;
  }

  isImportAndExportable(type) {
    return this.registry.isImportableAndExportable(type);
  }

  getDefaultSearchField(type) {
    var _this$registry$getTyp, _this$registry$getTyp2;

    return (_this$registry$getTyp = this.registry.getType(type)) === null || _this$registry$getTyp === void 0 ? void 0 : (_this$registry$getTyp2 = _this$registry$getTyp.management) === null || _this$registry$getTyp2 === void 0 ? void 0 : _this$registry$getTyp2.defaultSearchField;
  }

  getIcon(type) {
    var _this$registry$getTyp3, _this$registry$getTyp4;

    return (_this$registry$getTyp3 = this.registry.getType(type)) === null || _this$registry$getTyp3 === void 0 ? void 0 : (_this$registry$getTyp4 = _this$registry$getTyp3.management) === null || _this$registry$getTyp4 === void 0 ? void 0 : _this$registry$getTyp4.icon;
  }

  getTitle(savedObject) {
    var _this$registry$getTyp5, _this$registry$getTyp6;

    const getTitle = (_this$registry$getTyp5 = this.registry.getType(savedObject.type)) === null || _this$registry$getTyp5 === void 0 ? void 0 : (_this$registry$getTyp6 = _this$registry$getTyp5.management) === null || _this$registry$getTyp6 === void 0 ? void 0 : _this$registry$getTyp6.getTitle;
    return getTitle ? getTitle(savedObject) : undefined;
  }

  getEditUrl(savedObject) {
    var _this$registry$getTyp7, _this$registry$getTyp8;

    const getEditUrl = (_this$registry$getTyp7 = this.registry.getType(savedObject.type)) === null || _this$registry$getTyp7 === void 0 ? void 0 : (_this$registry$getTyp8 = _this$registry$getTyp7.management) === null || _this$registry$getTyp8 === void 0 ? void 0 : _this$registry$getTyp8.getEditUrl;
    return getEditUrl ? getEditUrl(savedObject) : undefined;
  }

  getInAppUrl(savedObject) {
    var _this$registry$getTyp9, _this$registry$getTyp10;

    const getInAppUrl = (_this$registry$getTyp9 = this.registry.getType(savedObject.type)) === null || _this$registry$getTyp9 === void 0 ? void 0 : (_this$registry$getTyp10 = _this$registry$getTyp9.management) === null || _this$registry$getTyp10 === void 0 ? void 0 : _this$registry$getTyp10.getInAppUrl;
    return getInAppUrl ? getInAppUrl(savedObject) : undefined;
  }

  getNamespaceType(savedObject) {
    var _this$registry$getTyp11;

    return (_this$registry$getTyp11 = this.registry.getType(savedObject.type)) === null || _this$registry$getTyp11 === void 0 ? void 0 : _this$registry$getTyp11.namespaceType;
  }

}

exports.SavedObjectsManagement = SavedObjectsManagement;