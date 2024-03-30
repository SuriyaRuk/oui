"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseClientOptions = parseClientOptions;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Parse the client options from given data source config and endpoint
 *
 * @param config The config to generate the client options from.
 * @param endpoint endpoint url of data source
 */
function parseClientOptions( // TODO: will use client configs, that comes from a merge result of user config and default opensearch client config,
config, endpoint) {
  const clientOptions = {
    node: endpoint,
    ssl: {
      requestCert: true,
      rejectUnauthorized: true
    }
  };
  return clientOptions;
}