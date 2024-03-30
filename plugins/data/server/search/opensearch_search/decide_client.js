"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decideClient = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const decideClient = async (context, request) => {
  // if data source feature is disabled, return default opensearch client of current user
  const client = request.dataSourceId && context.dataSource ? await context.dataSource.opensearch.getClient(request.dataSourceId) : context.core.opensearch.client.asCurrentUser;
  return client;
};

exports.decideClient = decideClient;