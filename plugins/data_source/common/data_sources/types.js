"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SigV4ServiceName = exports.AuthType = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Multiple datasource supports authenticating as IAM user, it doesn't support IAM role.
 * Because IAM role session requires temporary security credentials through assuming role,
 * which makes no sense to store the credentials.
 */
let AuthType;
exports.AuthType = AuthType;

(function (AuthType) {
  AuthType["NoAuth"] = "no_auth";
  AuthType["UsernamePasswordType"] = "username_password";
  AuthType["SigV4"] = "sigv4";
})(AuthType || (exports.AuthType = AuthType = {}));

let SigV4ServiceName;
exports.SigV4ServiceName = SigV4ServiceName;

(function (SigV4ServiceName) {
  SigV4ServiceName["OpenSearch"] = "es";
  SigV4ServiceName["OpenSearchServerless"] = "aoss";
})(SigV4ServiceName || (exports.SigV4ServiceName = SigV4ServiceName = {}));