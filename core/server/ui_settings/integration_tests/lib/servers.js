"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServices = getServices;
exports.startServers = startServers;
exports.stopServers = stopServers;

var _osd_server = require("../../../../test_helpers/osd_server");

var _http_server = require("../../../http/http_server.mocks");

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
let servers;
let opensearchServer;
let osd;
let osdServer;
let services;

async function startServers() {
  servers = (0, _osd_server.createTestServers)({
    adjustTimeout: t => jest.setTimeout(t),
    settings: {
      osd: {
        uiSettings: {
          overrides: {
            foo: 'bar'
          }
        }
      }
    }
  });
  opensearchServer = await servers.startOpenSearch();
  osd = await servers.startOpenSearchDashboards();
  osdServer = osd.osdServer;
}

function getServices() {
  if (services) {
    return services;
  }

  const callCluster = opensearchServer.opensearch.getCallCluster();
  const savedObjectsClient = osd.coreStart.savedObjects.getScopedClient(_http_server.httpServerMock.createOpenSearchDashboardsRequest());
  const uiSettings = osdServer.newPlatform.start.core.uiSettings.asScopedToClient(savedObjectsClient);
  services = {
    osdServer,
    callCluster,
    savedObjectsClient,
    uiSettings
  };
  return services;
}

async function stopServers() {
  services = null;
  osdServer = null;

  if (servers) {
    await opensearchServer.stop();
    await osd.stop();
  }
}