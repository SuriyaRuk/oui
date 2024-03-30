"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpServerMock = void 0;

var _url = require("url");

var _lodash = require("lodash");

var _net = require("net");

var _queryString = require("query-string");

var _configSchema = require("@osd/config-schema");

var _router = require("./router");

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
function createOpenSearchDashboardsRequestMock({
  path = '/path',
  headers = {
    accept: 'something/html'
  },
  params = {},
  body = {},
  query = {},
  method = 'get',
  socket = new _net.Socket(),
  routeTags,
  routeAuthRequired,
  validation = {},
  opensearchDashboardsRouteOptions = {
    xsrfRequired: true
  },
  opensearchDashboardsRequestState = {
    requestId: '123',
    requestUuid: '123e4567-e89b-12d3-a456-426614174000'
  },
  auth = {
    isAuthenticated: true
  }
} = {}) {
  const queryString = (0, _queryString.stringify)(query, {
    sort: false
  });
  const url = new _url.URL(`${path}${queryString ? `?${queryString}` : ''}`, 'http://localhost');
  return _router.OpenSearchDashboardsRequest.from(createRawRequestMock({
    app: opensearchDashboardsRequestState,
    auth,
    headers,
    params,
    query,
    payload: body,
    path,
    method,
    url,
    route: {
      settings: {
        tags: routeTags,
        // @ts-expect-error According to types/hapi__hapi `auth` can't be a boolean, but it can according to the @hapi/hapi source (https://github.com/hapijs/hapi/blob/v20.2.1/lib/route.js#L134)
        auth: routeAuthRequired,
        app: opensearchDashboardsRouteOptions
      }
    },
    raw: {
      req: {
        socket,
        // these are needed to avoid an error when consuming OpenSearchDashboardsRequest.events
        on: jest.fn(),
        off: jest.fn()
      }
    }
  }), {
    params: validation.params || _configSchema.schema.any(),
    body: validation.body || _configSchema.schema.any(),
    query: validation.query || _configSchema.schema.any()
  });
} // eslint-disable-next-line @typescript-eslint/no-empty-interface


function createRawRequestMock(customization = {}) {
  var _customization$url, _customization$url2;

  const pathname = ((_customization$url = customization.url) === null || _customization$url === void 0 ? void 0 : _customization$url.pathname) || '/';
  const path = `${pathname}${((_customization$url2 = customization.url) === null || _customization$url2 === void 0 ? void 0 : _customization$url2.search) || ''}`;
  const url = new _url.URL((0, _url.format)(Object.assign({
    pathname,
    path,
    href: path
  }, customization.url)), 'http://localhost');
  return (0, _lodash.merge)({}, {
    app: {
      xsrfRequired: true
    },
    auth: {
      isAuthenticated: true
    },
    headers: {},
    path,
    route: {
      settings: {}
    },
    url,
    raw: {
      req: {
        url: path,
        socket: {}
      }
    }
  }, customization);
}

const createResponseFactoryMock = () => ({
  ok: jest.fn(),
  accepted: jest.fn(),
  noContent: jest.fn(),
  custom: jest.fn(),
  redirected: jest.fn(),
  badRequest: jest.fn(),
  unauthorized: jest.fn(),
  forbidden: jest.fn(),
  notFound: jest.fn(),
  conflict: jest.fn(),
  internalError: jest.fn(),
  customError: jest.fn()
});

const createLifecycleResponseFactoryMock = () => ({
  redirected: jest.fn(),
  badRequest: jest.fn(),
  unauthorized: jest.fn(),
  forbidden: jest.fn(),
  notFound: jest.fn(),
  conflict: jest.fn(),
  internalError: jest.fn(),
  customError: jest.fn()
});

const createToolkitMock = () => {
  return {
    render: jest.fn(),
    next: jest.fn(),
    rewriteUrl: jest.fn()
  };
};

const httpServerMock = {
  createOpenSearchDashboardsRequest: createOpenSearchDashboardsRequestMock,
  createRawRequest: createRawRequestMock,
  createResponseFactory: createResponseFactoryMock,
  createLifecycleResponseFactory: createLifecycleResponseFactoryMock,
  createToolkit: createToolkitMock
};
exports.httpServerMock = httpServerMock;