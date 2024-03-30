"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePath = void 0;

var _std = require("@osd/std");

var _router = require("./router");

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

/**
 * Access or manipulate the OpenSearch Dashboards base path
 *
 * @public
 */
class BasePath {
  /**
   * returns the server's basePath
   *
   * See {@link BasePath.get} for getting the basePath value for a specific request
   */

  /** @internal */
  constructor(serverBasePath = '') {
    _defineProperty(this, "basePathCache", new WeakMap());

    _defineProperty(this, "serverBasePath", void 0);

    _defineProperty(this, "get", request => {
      const requestScopePath = this.basePathCache.get((0, _router.ensureRawRequest)(request)) || '';
      return `${this.serverBasePath}${requestScopePath}`;
    });

    _defineProperty(this, "set", (request, requestSpecificBasePath) => {
      const rawRequest = (0, _router.ensureRawRequest)(request);

      if (this.basePathCache.has(rawRequest)) {
        throw new Error('Request basePath was previously set. Setting multiple times is not supported.');
      }

      this.basePathCache.set(rawRequest, requestSpecificBasePath);
    });

    _defineProperty(this, "prepend", path => {
      if (this.serverBasePath === '') return path;
      return (0, _std.modifyUrl)(path, parts => {
        if (!parts.hostname && parts.pathname && parts.pathname.startsWith('/')) {
          parts.pathname = `${this.serverBasePath}${parts.pathname}`;
        }
      });
    });

    _defineProperty(this, "remove", path => {
      if (this.serverBasePath === '') {
        return path;
      }

      if (path === this.serverBasePath) {
        return '/';
      }

      if (path.startsWith(`${this.serverBasePath}/`)) {
        return path.slice(this.serverBasePath.length);
      }

      return path;
    });

    this.serverBasePath = serverBasePath;
  }
  /**
   * returns `basePath` value, specific for an incoming request.
   */

  /**
   * sets `basePath` value, specific for an incoming request.
   *
   * @privateRemarks should work only for OpenSearchDashboardsRequest as soon as spaces migrate to NP
   */

  /**
   * Prepends `path` with the basePath.
   */

  /**
   * Removes the prepended basePath from the `path`.
   */


}
/**
 * Access or manipulate the OpenSearch Dashboards base path
 *
 * {@link BasePath}
 * @public
 */


exports.BasePath = BasePath;