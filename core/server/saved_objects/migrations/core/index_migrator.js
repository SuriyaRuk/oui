"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexMigrator = void 0;

var _build_active_mappings = require("./build_active_mappings");

var Index = _interopRequireWildcard(require("./opensearch_index"));

var _migrate_raw_docs = require("./migrate_raw_docs");

var _migration_context = require("./migration_context");

var _migration_coordinator = require("./migration_coordinator");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * The OpenSearch Contributors require contributions made to
                                                                                                                                                                                                                   * this file be licensed under the Apache-2.0 license or a
                                                                                                                                                                                                                   * compatible open source license.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Any modifications Copyright OpenSearch Contributors. See
                                                                                                                                                                                                                   * GitHub history for details.
                                                                                                                                                                                                                   */ /*
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
 * Core logic for migrating the mappings and documents in an index.
 */
class IndexMigrator {
  /**
   * Creates an instance of IndexMigrator.
   *
   * @param {MigrationOpts} opts
   */
  constructor(opts) {
    _defineProperty(this, "opts", void 0);

    this.opts = opts;
  }
  /**
   * Migrates the index, or, if another OpenSearch Dashboards instance appears to be running the migration,
   * waits for the migration to complete.
   *
   * @returns {Promise<MigrationResult>}
   */


  async migrate() {
    const context = await (0, _migration_context.migrationContext)(this.opts);
    return (0, _migration_coordinator.coordinateMigration)({
      log: context.log,
      pollInterval: context.pollInterval,

      async isMigrated() {
        return !(await requiresMigration(context));
      },

      async runMigration() {
        if (await requiresMigration(context)) {
          return migrateIndex(context);
        }

        return {
          status: 'skipped'
        };
      }

    });
  }

}
/**
 * Determines what action the migration system needs to take (none, patch, migrate).
 */


exports.IndexMigrator = IndexMigrator;

async function requiresMigration(context) {
  const {
    client,
    alias,
    documentMigrator,
    dest,
    log
  } = context; // Have all of our known migrations been run against the index?

  const hasMigrations = await Index.migrationsUpToDate(client, alias, documentMigrator.migrationVersion);

  if (!hasMigrations) {
    return true;
  } // Is our index aliased?


  const refreshedSource = await Index.fetchInfo(client, alias);

  if (!refreshedSource.aliases[alias]) {
    return true;
  } // Do the actual index mappings match our expectations?


  const diffResult = (0, _build_active_mappings.diffMappings)(refreshedSource.mappings, dest.mappings);

  if (diffResult) {
    log.info(`Detected mapping change in "${diffResult.changedProp}"`);
    return true;
  }

  return false;
}
/**
 * Performs an index migration if the source index exists, otherwise
 * this simply creates the dest index with the proper mappings.
 */


async function migrateIndex(context) {
  const startTime = Date.now();
  const {
    client,
    alias,
    source,
    dest,
    log
  } = context;
  await deleteIndexTemplates(context);
  log.info(`Creating index ${dest.indexName}.`);
  await Index.createIndex(client, dest.indexName, dest.mappings);
  await migrateSourceToDest(context);
  log.info(`Pointing alias ${alias} to ${dest.indexName}.`);
  await Index.claimAlias(client, dest.indexName, alias);
  const result = {
    status: 'migrated',
    destIndex: dest.indexName,
    sourceIndex: source.indexName,
    elapsedMs: Date.now() - startTime
  };
  log.info(`Finished in ${result.elapsedMs}ms.`);
  return result;
}
/**
 * If the obsoleteIndexTemplatePattern option is specified, this will delete any index templates
 * that match it.
 */


async function deleteIndexTemplates({
  client,
  log,
  obsoleteIndexTemplatePattern
}) {
  if (!obsoleteIndexTemplatePattern) {
    return;
  }

  const {
    body: templates
  } = await client.cat.templates({
    format: 'json',
    name: obsoleteIndexTemplatePattern
  });

  if (!templates.length) {
    return;
  }

  const templateNames = templates.map(t => t.name);
  log.info(`Removing index templates: ${templateNames}`);
  return Promise.all(templateNames.map(name => client.indices.deleteTemplate({
    name: name
  })));
}
/**
 * Moves all docs from sourceIndex to destIndex, migrating each as necessary.
 * This moves documents from the concrete index, rather than the alias, to prevent
 * a situation where the alias moves out from under us as we're migrating docs.
 */


async function migrateSourceToDest(context) {
  const {
    client,
    alias,
    dest,
    source,
    batchSize
  } = context;
  const {
    scrollDuration,
    documentMigrator,
    log,
    serializer
  } = context;

  if (!source.exists) {
    return;
  }

  if (!source.aliases[alias]) {
    log.info(`Reindexing ${alias} to ${source.indexName}`);
    await Index.convertToAlias(client, source, alias, batchSize, context.convertToAliasScript);
  }

  const read = Index.reader(client, source.indexName, {
    batchSize,
    scrollDuration
  });
  log.info(`Migrating ${source.indexName} saved objects to ${dest.indexName}`);

  while (true) {
    const docs = await read();

    if (!docs || !docs.length) {
      return;
    }

    log.debug(`Migrating saved objects ${docs.map(d => d._id).join(', ')}`);
    await Index.write(client, dest.indexName, // @ts-expect-error @opensearch-project/opensearch _source is optional
    await (0, _migrate_raw_docs.migrateRawDocs)(serializer, documentMigrator.migrate, docs, log));
  }
}