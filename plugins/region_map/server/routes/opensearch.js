"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGeospatialRoutes = registerGeospatialRoutes;

var _configSchema = require("@osd/config-schema");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function registerGeospatialRoutes(router) {
  router.post({
    path: '/api/geospatial/_indices',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string()
      })
    }
  }, async (context, req, res) => {
    const client = context.core.opensearch.client.asCurrentUser;

    try {
      const {
        index
      } = req.body;
      const indices = await client.cat.indices({
        index,
        format: 'json'
      });
      return res.ok({
        body: {
          ok: true,
          resp: indices.body
        }
      });
    } catch (err) {
      // Opensearch throws an index_not_found_exception which we'll treat as a success
      if (err.statusCode === 404) {
        return res.ok({
          body: {
            ok: false,
            resp: []
          }
        });
      } else {
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    }
  });
  router.post({
    path: '/api/geospatial/_search',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string(),
        size: _configSchema.schema.number()
      })
    }
  }, async (context, req, res) => {
    const client = context.core.opensearch.client.asCurrentUser;

    try {
      const {
        index,
        size
      } = req.body;
      const params = {
        index,
        body: {},
        size
      };
      const results = await client.search(params);
      return res.ok({
        body: {
          ok: true,
          resp: results.body
        }
      });
    } catch (err) {
      return res.ok({
        body: {
          ok: false,
          resp: err.message
        }
      });
    }
  });
  router.post({
    path: '/api/geospatial/_mappings',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string()
      })
    }
  }, async (context, req, res) => {
    const client = context.core.opensearch.client.asCurrentUser;

    try {
      const {
        index
      } = req.body;
      const mappings = await client.indices.getMapping({
        index
      });
      return res.ok({
        body: {
          ok: true,
          resp: mappings.body
        }
      });
    } catch (err) {
      return res.ok({
        body: {
          ok: false,
          resp: err.message
        }
      });
    }
  });
}