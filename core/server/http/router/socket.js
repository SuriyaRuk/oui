"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSearchDashboardsSocket = void 0;

var _tls = require("tls");

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
 * A tiny abstraction for TCP socket.
 * @public
 */
class OpenSearchDashboardsSocket {
  constructor(socket) {
    this.socket = socket;

    _defineProperty(this, "authorized", void 0);

    _defineProperty(this, "authorizationError", void 0);

    if (this.socket instanceof _tls.TLSSocket) {
      this.authorized = this.socket.authorized;
      this.authorizationError = this.socket.authorizationError;
    }
  }

  getPeerCertificate(detailed) {
    if (this.socket instanceof _tls.TLSSocket) {
      const peerCertificate = this.socket.getPeerCertificate(detailed); // If the peer does not provide a certificate, it returns null (if the socket has been destroyed)
      // or an empty object, so we should check for both these cases.

      if (peerCertificate && Object.keys(peerCertificate).length > 0) return peerCertificate;
    }

    return null;
  }

}

exports.OpenSearchDashboardsSocket = OpenSearchDashboardsSocket;