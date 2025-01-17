"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordinateMigration = coordinateMigration;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/*
 * This provides a mechanism for preventing multiple OpenSearch Dashboards instances from
 * simultaneously running migrations on the same index. It synchronizes this
 * by handling index creation conflicts, and putting this instance into a
 * poll loop that periodically checks to see if the index is migrated.
 *
 * The reason we have to coordinate this, rather than letting each OpenSearch Dashboards instance
 * perform duplicate work, is that if we allowed each OpenSearch Dashboards to simply run migrations in
 * parallel, they would each try to reindex and each try to create the destination index.
 * If those indices already exist, it may be due to contention between multiple OpenSearchDashboards
 * instances (which is safe to ignore), but it may be due to a partially completed migration,
 * or someone tampering with the OpenSearch Dashboards alias. In these cases, it's not clear that we should
 * just migrate data into an existing index. Such an action could result in data loss. Instead,
 * we should probably fail, and the OpenSearch Dashboards sys-admin should clean things up before relaunching
 * OpenSearchDashboards.
 */
const DEFAULT_POLL_INTERVAL = 15000;

/**
 * Runs the migration specified by opts. If the migration fails due to an index
 * creation conflict, this falls into a polling loop, checking every pollInterval
 * milliseconds if the index is migrated.
 *
 * @export
 * @param {Opts} opts
 * @prop {Migration} runMigration - A function that runs the index migration
 * @prop {IsMigrated} isMigrated - A function which checks if the index is already migrated
 * @prop {Logger} log - The migration logger
 * @prop {number} pollInterval - How often, in ms, to check that the index is migrated
 * @returns
 */
async function coordinateMigration(opts) {
  try {
    return await opts.runMigration();
  } catch (error) {
    if (handleIndexExists(error, opts.log)) {
      await waitForMigration(opts.isMigrated, opts.pollInterval);
      return {
        status: 'skipped'
      };
    }

    throw error;
  }
}
/**
 * If the specified error is an index exists error, this logs a warning,
 * and is the cue for us to fall into a polling loop, waiting for some
 * other OpenSearch Dashboards instance to complete the migration.
 */


function handleIndexExists(error, log) {
  const isIndexExistsError = _lodash.default.get(error, 'body.error.type') === 'resource_already_exists_exception';

  if (!isIndexExistsError) {
    return false;
  }

  const index = _lodash.default.get(error, 'body.error.index');

  log.warning(`Another OpenSearch Dashboards instance appears to be migrating the index. Waiting for ` + `that migration to complete. If no other OpenSearch Dashboards instance is attempting ` + `migrations, you can get past this message by deleting index ${index} and ` + `restarting OpenSearchDashboards.`);
  return true;
}
/**
 * Polls isMigrated every pollInterval milliseconds until it returns true.
 */


async function waitForMigration(isMigrated, pollInterval = DEFAULT_POLL_INTERVAL) {
  while (true) {
    if (await isMigrated()) {
      return;
    }

    await sleep(pollInterval);
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}