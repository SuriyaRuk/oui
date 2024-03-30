"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WRAPPING_KEY_SIZE = exports.ENCODING_STRATEGY = exports.CryptographyService = void 0;

var _clientNode = require("@aws-crypto/client-node");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Copyright OpenSearch Contributors
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   */

const ENCODING_STRATEGY = 'base64';
exports.ENCODING_STRATEGY = ENCODING_STRATEGY;
const WRAPPING_KEY_SIZE = 32;
exports.WRAPPING_KEY_SIZE = WRAPPING_KEY_SIZE;

class CryptographyService {
  // commitment policy to enable data key derivation and ECDSA signature
  // algorithm suite identifier to adopt AES-GCM
  constructor(logger) {
    this.logger = logger;

    _defineProperty(this, "commitmentPolicy", _clientNode.CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

    _defineProperty(this, "wrappingSuite", _clientNode.RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING);
  }

  setup(config) {
    // Fetch configs used to create credential saved objects client wrapper
    const {
      wrappingKeyName,
      wrappingKeyNamespace,
      wrappingKey
    } = config.encryption;

    if (wrappingKey.length !== WRAPPING_KEY_SIZE) {
      const wrappingKeySizeMismatchMsg = `Wrapping key size should be 32 bytes, as used in envelope encryption. Current wrapping key size: '${wrappingKey.length}' bytes`;
      this.logger.error(wrappingKeySizeMismatchMsg);
      throw new Error(wrappingKeySizeMismatchMsg);
    } // Create raw AES keyring


    const keyring = new _clientNode.RawAesKeyringNode({
      keyName: wrappingKeyName,
      keyNamespace: wrappingKeyNamespace,
      unencryptedMasterKey: new Uint8Array(wrappingKey),
      wrappingSuite: this.wrappingSuite
    }); // Destructuring encrypt and decrypt functions from client

    const {
      encrypt,
      decrypt
    } = (0, _clientNode.buildClient)(this.commitmentPolicy);

    const encryptAndEncode = async (plainText, encryptionContext = {}) => {
      const result = await encrypt(keyring, plainText, {
        encryptionContext
      });
      return result.result.toString(ENCODING_STRATEGY);
    };

    const decodeAndDecrypt = async encrypted => {
      const {
        plaintext,
        messageHeader
      } = await decrypt(keyring, Buffer.from(encrypted, ENCODING_STRATEGY));
      return {
        decryptedText: plaintext.toString(),
        encryptionContext: {
          endpoint: messageHeader.encryptionContext.endpoint
        }
      };
    };

    return {
      encryptAndEncode,
      decodeAndDecrypt
    };
  }

  start() {}

  stop() {}

}

exports.CryptographyService = CryptographyService;