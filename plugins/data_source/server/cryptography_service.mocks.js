"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cryptographyServiceSetupMock = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const create = () => ({
  encryptAndEncode: jest.fn(),
  decodeAndDecrypt: jest.fn()
});

const cryptographyServiceSetupMock = {
  create
};
exports.cryptographyServiceSetupMock = cryptographyServiceSetupMock;