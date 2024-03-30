"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuthorizationContext = exports.AuthorizationProvider = exports.AuthorizationContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../public");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
const initialValue = {
  isLoading: true,
  apiError: null,
  privileges: {
    hasAllPrivileges: true,
    missingPrivileges: {}
  }
};
const AuthorizationContext = /*#__PURE__*/(0, _react.createContext)(initialValue);
exports.AuthorizationContext = AuthorizationContext;

const useAuthorizationContext = () => {
  const ctx = (0, _react.useContext)(AuthorizationContext);

  if (!ctx) {
    throw new Error('AuthorizationContext can only be used inside of AuthorizationProvider!');
  }

  return ctx;
};

exports.useAuthorizationContext = useAuthorizationContext;

const AuthorizationProvider = ({
  privilegesEndpoint,
  httpClient,
  children
}) => {
  const {
    isLoading,
    error,
    data: privilegesData
  } = (0, _public.useRequest)(httpClient, {
    path: privilegesEndpoint,
    method: 'get'
  });
  const value = {
    isLoading,
    privileges: isLoading ? {
      hasAllPrivileges: true,
      missingPrivileges: {}
    } : privilegesData,
    apiError: error ? error : null
  };
  return /*#__PURE__*/_react.default.createElement(AuthorizationContext.Provider, {
    value: value
  }, children);
};

exports.AuthorizationProvider = AuthorizationProvider;