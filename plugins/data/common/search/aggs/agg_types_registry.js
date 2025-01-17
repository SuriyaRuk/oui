"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggTypesRegistry = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
// eslint-disable-next-line @osd/eslint/no-restricted-paths

/**
 * AggsCommonStart returns the _unitialized_ agg type providers, but in our
 * real start contract we will need to return the initialized versions.
 * So we need to provide the correct typings so they can be overwritten
 * on client/server.
 *
 * @internal
 */
class AggTypesRegistry {
  constructor() {
    _defineProperty(this, "bucketAggs", new Map());

    _defineProperty(this, "metricAggs", new Map());

    _defineProperty(this, "setup", () => {
      return {
        registerBucket: (name, type) => {
          if (this.bucketAggs.get(name) || this.metricAggs.get(name)) {
            throw new Error(`Agg has already been registered with name: ${name}`);
          }

          this.bucketAggs.set(name, type);
        },
        registerMetric: (name, type) => {
          if (this.bucketAggs.get(name) || this.metricAggs.get(name)) {
            throw new Error(`Agg has already been registered with name: ${name}`);
          }

          this.metricAggs.set(name, type);
        }
      };
    });

    _defineProperty(this, "start", ({
      uiSettings
    }) => {
      const disabledBucketAgg = uiSettings.get('visualize:disableBucketAgg');

      if (disabledBucketAgg !== undefined && Array.isArray(disabledBucketAgg)) {
        for (const k of this.bucketAggs.keys()) {
          if (disabledBucketAgg.includes(k)) this.bucketAggs.delete(k);
        }
      }

      return {
        get: name => {
          return this.bucketAggs.get(name) || this.metricAggs.get(name);
        },
        getAll: () => {
          return {
            buckets: Array.from(this.bucketAggs.values()),
            metrics: Array.from(this.metricAggs.values())
          };
        }
      };
    });
  }

}

exports.AggTypesRegistry = AggTypesRegistry;