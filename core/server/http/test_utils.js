"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHttpServer = exports.createCoreContext = void 0;

var _rxjs = require("rxjs");

var _devUtils = require("@osd/dev-utils");

var _configSchema = require("@osd/config-schema");

var _config = require("../config");

var _http_service = require("./http_service");

var _mocks = require("../config/mocks");

var _logging_system = require("../logging/logging_system.mock");

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
const coreId = Symbol('core');

const env = _config.Env.createDefault(_devUtils.REPO_ROOT, (0, _mocks.getEnvOptions)());

const logger = _logging_system.loggingSystemMock.create();

const configService = _mocks.configServiceMock.create();

configService.atPath.mockReturnValue(new _rxjs.BehaviorSubject({
  hosts: ['localhost'],
  maxPayload: new _configSchema.ByteSizeValue(1024),
  autoListen: true,
  ssl: {
    enabled: false
  },
  compression: {
    enabled: true
  },
  xsrf: {
    disableProtection: true,
    whitelist: []
  },
  customResponseHeaders: {},
  requestId: {
    allowFromAnyIp: true,
    ipAllowlist: []
  },
  keepaliveTimeout: 120_000,
  socketTimeout: 120_000
}));
const defaultContext = {
  coreId,
  env,
  logger,
  configService
};

const createCoreContext = (overrides = {}) => ({ ...defaultContext,
  ...overrides
});
/**
 * Creates a concrete HttpServer with a mocked context.
 */


exports.createCoreContext = createCoreContext;

const createHttpServer = (overrides = {}) => {
  return new _http_service.HttpService(createCoreContext(overrides));
};

exports.createHttpServer = createHttpServer;