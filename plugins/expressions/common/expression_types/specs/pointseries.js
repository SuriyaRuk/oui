"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointseries = void 0;

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
const name = 'pointseries';
/**
 * Allowed column names in a PointSeries
 */

/**
 * Column in a PointSeries
 */

/**
 * Represents a collection of valid Columns in a PointSeries
 */

/**
 * A `PointSeries` is a unique structure that represents dots on a chart.
 */

const pointseries = {
  name,
  from: {
    null: () => {
      return {
        type: name,
        rows: [],
        columns: {}
      };
    }
  },
  to: {
    render: (pseries, types) => {
      const datatable = types.datatable.from(pseries, types);
      return {
        type: 'render',
        as: 'table',
        value: {
          datatable,
          showHeader: true
        }
      };
    }
  }
};
exports.pointseries = pointseries;