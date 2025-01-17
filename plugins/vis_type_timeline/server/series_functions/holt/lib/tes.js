"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tes;

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
// Frequency = number of points per season
// Season = 1 hump

/*
Hourly data might have:
 - Daily seasonality (frequency=24)
 - Weekly seasonality (frequency=24×7=168)
 - Annual seasonality (frequency=24×365.25=8766)
*/
// Uh, I don't think this will work when you have nulls in the initial seasonal components
function initSeasonalComponents(samplePoints, seasonLength) {
  const sampledSeasonCount = samplePoints.length / seasonLength;
  let currentSeason = [];

  const seasonalAverages = _lodash.default.reduce(samplePoints, (result, point, i) => {
    currentSeason.push(point); // If this is the end of the season, add it to the result;

    if (i % seasonLength === seasonLength - 1) {
      result.push(_lodash.default.sum(currentSeason) / seasonLength);
      currentSeason = [];
    }

    return result;
  }, []);

  const seasonals = _lodash.default.times(seasonLength, i => {
    let sumOfValsOverAvg = 0;

    _lodash.default.times(sampledSeasonCount, j => {
      sumOfValsOverAvg += samplePoints[seasonLength * j + i] - seasonalAverages[j];
    });

    return sumOfValsOverAvg / sampledSeasonCount;
  });

  return seasonals;
} // This is different from the DES method of establishing trend because it looks for
// the difference in points between seasons


function initTrend(samplePoints, seasonLength) {
  let sum = 0;

  _lodash.default.times(seasonLength, i => {
    sum += (samplePoints[i + seasonLength] - samplePoints[i]) / seasonLength;
  });

  return sum / seasonLength;
}

function tes(points, alpha, beta, gamma, seasonLength, seasonsToSample) {
  const samplePoints = points.slice(0, seasonLength * seasonsToSample);
  const seasonals = initSeasonalComponents(samplePoints, seasonLength);
  let level;
  let prevLevel;
  let trend;
  let prevTrend;
  let unknownCount = 0;

  const result = _lodash.default.map(points, (point, i) => {
    const seasonalPosition = i % seasonLength; // For the first samplePoints.length we use the actual points
    // After that we switch to the forecast

    if (i === 0) {
      trend = initTrend(points, seasonLength);
      level = points[0];
      return points[0];
    } // Beta isn't actually used once we're forecasting?


    if (point == null || i >= samplePoints.length) {
      unknownCount++; // Don't know this point, make it up!

      return level + unknownCount * trend + seasonals[seasonalPosition];
    } else {
      unknownCount = 0; // These 2 variables are not required, but are used for clarity.

      prevLevel = level;
      prevTrend = trend;
      level = alpha * (point - seasonals[seasonalPosition]) + (1 - alpha) * (prevLevel + prevTrend);
      trend = beta * (level - prevLevel) + (1 - beta) * prevTrend;
      seasonals[seasonalPosition] = gamma * (point - level) + (1 - gamma) * seasonals[seasonalPosition];
      return level + trend + seasonals[seasonalPosition];
    }
  });

  return result;
}

module.exports = exports.default;