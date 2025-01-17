"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyScopedClusterClient = void 0;

var _lodash = require("lodash");

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

/**
 * Serves the same purpose as "normal" `ClusterClient` but exposes additional
 * `callAsCurrentUser` method that doesn't use credentials of the OpenSearch Dashboards internal
 * user (as `callAsInternalUser` does) to request OpenSearch API, but rather
 * passes HTTP headers extracted from the current user request to the API.
 *
 * See {@link LegacyScopedClusterClient}.
 *
 * @deprecated Use {@link IScopedClusterClient}.
 * @public
 */

/**
 * {@inheritDoc IScopedClusterClient}
 * @deprecated Use {@link IScopedClusterClient | scoped cluster client}.
 * @public
 */
class LegacyScopedClusterClient {
  constructor(internalAPICaller, scopedAPICaller, headers, auditor) {
    this.internalAPICaller = internalAPICaller;
    this.scopedAPICaller = scopedAPICaller;
    this.headers = headers;
    this.auditor = auditor;
    this.callAsCurrentUser = this.callAsCurrentUser.bind(this);
    this.callAsInternalUser = this.callAsInternalUser.bind(this);
  }
  /**
   * Calls specified `endpoint` with provided `clientParams` on behalf of the
   * OpenSearch Dashboards internal user.
   * See {@link LegacyAPICaller}.
   *
   * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
   * @param clientParams - A dictionary of parameters that will be passed directly to the OpenSearch JS client.
   * @param options - Options that affect the way we call the API and process the result.
   */


  callAsInternalUser(endpoint, clientParams = {}, options) {
    if (this.auditor) {
      this.auditor.add({
        message: endpoint,
        type: 'opensearch.call.internalUser'
      });
    }

    return this.internalAPICaller(endpoint, clientParams, options);
  }
  /**
   * Calls specified `endpoint` with provided `clientParams` on behalf of the
   * user initiated request to the OpenSearch Dashboards server (via HTTP request headers).
   * See {@link LegacyAPICaller}.
   *
   * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
   * @param clientParams - A dictionary of parameters that will be passed directly to the OpenSearch JS client.
   * @param options - Options that affect the way we call the API and process the result.
   */


  callAsCurrentUser(endpoint, clientParams = {}, options) {
    const defaultHeaders = this.headers;

    if (defaultHeaders !== undefined) {
      const customHeaders = clientParams.headers;

      if ((0, _lodash.isObject)(customHeaders)) {
        const duplicates = (0, _lodash.intersection)(Object.keys(defaultHeaders), Object.keys(customHeaders));
        duplicates.forEach(duplicate => {
          if (defaultHeaders[duplicate] !== customHeaders[duplicate]) {
            throw Error(`Cannot override default header ${duplicate}.`);
          }
        });
      }

      clientParams.headers = Object.assign({}, clientParams.headers, this.headers);
    }

    if (this.auditor) {
      this.auditor.add({
        message: endpoint,
        type: 'opensearch.call.currentUser'
      });
    }

    return this.scopedAPICaller(endpoint, clientParams, options);
  }

}

exports.LegacyScopedClusterClient = LegacyScopedClusterClient;