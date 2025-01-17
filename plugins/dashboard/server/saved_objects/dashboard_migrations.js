"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardSavedObjectTypeMigrations = void 0;

var _lodash = require("lodash");

var _migrations_ = require("./migrations_730");

var _migrate_match_all_query = require("./migrate_match_all_query");

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
function migrateIndexPattern(doc) {
  const searchSourceJSON = (0, _lodash.get)(doc, 'attributes.kibanaSavedObjectMeta.searchSourceJSON');

  if (typeof searchSourceJSON !== 'string') {
    return;
  }

  let searchSource;

  try {
    searchSource = JSON.parse(searchSourceJSON);
  } catch (e) {
    // Let it go, the data is invalid and we'll leave it as is
    return;
  }

  if (searchSource.index) {
    searchSource.indexRefName = 'kibanaSavedObjectMeta.searchSourceJSON.index';
    doc.references.push({
      name: searchSource.indexRefName,
      type: 'index-pattern',
      id: searchSource.index
    });
    delete searchSource.index;
  }

  if (searchSource.filter) {
    searchSource.filter.forEach((filterRow, i) => {
      if (!filterRow.meta || !filterRow.meta.index) {
        return;
      }

      filterRow.meta.indexRefName = `kibanaSavedObjectMeta.searchSourceJSON.filter[${i}].meta.index`;
      doc.references.push({
        name: filterRow.meta.indexRefName,
        type: 'index-pattern',
        id: filterRow.meta.index
      });
      delete filterRow.meta.index;
    });
  }

  doc.attributes.kibanaSavedObjectMeta.searchSourceJSON = JSON.stringify(searchSource);
}

const migrations700 = doc => {
  // Set new "references" attribute
  doc.references = doc.references || []; // Migrate index pattern

  migrateIndexPattern(doc); // Migrate panels

  const panelsJSON = (0, _lodash.get)(doc, 'attributes.panelsJSON');

  if (typeof panelsJSON !== 'string') {
    return doc;
  }

  let panels;

  try {
    panels = JSON.parse(panelsJSON);
  } catch (e) {
    // Let it go, the data is invalid and we'll leave it as is
    return doc;
  }

  if (!Array.isArray(panels)) {
    return doc;
  }

  panels.forEach((panel, i) => {
    if (!panel.type || !panel.id) {
      return;
    }

    panel.panelRefName = `panel_${i}`;
    doc.references.push({
      name: `panel_${i}`,
      type: panel.type,
      id: panel.id
    });
    delete panel.type;
    delete panel.id;
  });
  doc.attributes.panelsJSON = JSON.stringify(panels);
  return doc;
};

const dashboardSavedObjectTypeMigrations = {
  /**
   * We need to have this migration twice, once with a version prior to 7.0.0 once with a version
   * after it. The reason for that is, that this migration has been introduced once 7.0.0 was already
   * released. Thus a user who already had 7.0.0 installed already got the 7.0.0 migrations below running,
   * so we need a version higher than that. But this fix was backported to the 6.7 release, meaning if we
   * would only have the 7.0.1 migration in here a user on the 6.7 release will migrate their saved objects
   * to the 7.0.1 state, and thus when updating their OpenSearch Dashboards to 7.0, will never run the 7.0.0 migrations introduced
   * in that version. So we apply this twice, once with 6.7.2 and once with 7.0.1 while the backport to 6.7
   * only contained the 6.7.2 migration and not the 7.0.1 migration.
   */
  '6.7.2': (0, _lodash.flow)(_migrate_match_all_query.migrateMatchAllQuery),
  '7.0.0': (0, _lodash.flow)(migrations700),
  '7.3.0': (0, _lodash.flow)(_migrations_.migrations730),
  '7.9.3': (0, _lodash.flow)(_migrate_match_all_query.migrateMatchAllQuery)
};
exports.dashboardSavedObjectTypeMigrations = dashboardSavedObjectTypeMigrations;