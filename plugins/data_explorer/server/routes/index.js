"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineRoutes = defineRoutes;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function defineRoutes(router) {
  router.get({
    path: '/api/data_explorer/example',
    validate: false
  }, async (context, request, response) => {
    return response.ok({
      body: {
        time: new Date().toISOString()
      }
    });
  });
}