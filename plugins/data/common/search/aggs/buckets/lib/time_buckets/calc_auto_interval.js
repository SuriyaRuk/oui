"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcAutoIntervalLessThan = calcAutoIntervalLessThan;
exports.calcAutoIntervalNear = calcAutoIntervalNear;

var _moment = _interopRequireDefault(require("moment"));

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
const boundsDescending = [{
  bound: Infinity,
  interval: Number(_moment.default.duration(1, 'year'))
}, {
  bound: Number(_moment.default.duration(1, 'year')),
  interval: Number(_moment.default.duration(1, 'month'))
}, {
  bound: Number(_moment.default.duration(3, 'week')),
  interval: Number(_moment.default.duration(1, 'week'))
}, {
  bound: Number(_moment.default.duration(1, 'week')),
  interval: Number(_moment.default.duration(1, 'd'))
}, {
  bound: Number(_moment.default.duration(24, 'hour')),
  interval: Number(_moment.default.duration(12, 'hour'))
}, {
  bound: Number(_moment.default.duration(6, 'hour')),
  interval: Number(_moment.default.duration(3, 'hour'))
}, {
  bound: Number(_moment.default.duration(2, 'hour')),
  interval: Number(_moment.default.duration(1, 'hour'))
}, {
  bound: Number(_moment.default.duration(45, 'minute')),
  interval: Number(_moment.default.duration(30, 'minute'))
}, {
  bound: Number(_moment.default.duration(20, 'minute')),
  interval: Number(_moment.default.duration(10, 'minute'))
}, {
  bound: Number(_moment.default.duration(9, 'minute')),
  interval: Number(_moment.default.duration(5, 'minute'))
}, {
  bound: Number(_moment.default.duration(3, 'minute')),
  interval: Number(_moment.default.duration(1, 'minute'))
}, {
  bound: Number(_moment.default.duration(45, 'second')),
  interval: Number(_moment.default.duration(30, 'second'))
}, {
  bound: Number(_moment.default.duration(15, 'second')),
  interval: Number(_moment.default.duration(10, 'second'))
}, {
  bound: Number(_moment.default.duration(7.5, 'second')),
  interval: Number(_moment.default.duration(5, 'second'))
}, {
  bound: Number(_moment.default.duration(5, 'second')),
  interval: Number(_moment.default.duration(1, 'second'))
}, {
  bound: Number(_moment.default.duration(500, 'ms')),
  interval: Number(_moment.default.duration(100, 'ms'))
}];

function getPerBucketMs(count, duration) {
  const ms = duration / count;
  return isFinite(ms) ? ms : NaN;
}

function normalizeMinimumInterval(targetMs) {
  const value = isNaN(targetMs) ? 0 : Math.max(Math.floor(targetMs), 1);
  return _moment.default.duration(value);
}
/**
 * Using some simple rules we pick a "pretty" interval that will
 * produce around the number of buckets desired given a time range.
 *
 * @param targetBucketCount desired number of buckets
 * @param duration time range the agg covers
 */


function calcAutoIntervalNear(targetBucketCount, duration) {
  const targetPerBucketMs = getPerBucketMs(targetBucketCount, duration); // Find the first bound which is smaller than our target.

  const lowerBoundIndex = boundsDescending.findIndex(({
    bound
  }) => {
    const boundMs = Number(bound);
    return boundMs <= targetPerBucketMs;
  }); // The bound immediately preceeding that lower bound contains the
  // interval most closely matching our target.

  if (lowerBoundIndex !== -1) {
    const nearestInterval = boundsDescending[lowerBoundIndex - 1].interval;
    return _moment.default.duration(nearestInterval);
  } // If the target is smaller than any of our bounds, then we'll use it for the interval as-is.


  return normalizeMinimumInterval(targetPerBucketMs);
}
/**
 * Pick a "pretty" interval that produces no more than the maxBucketCount
 * for the given time range.
 *
 * @param maxBucketCount maximum number of buckets to create
 * @param duration amount of time covered by the agg
 */


function calcAutoIntervalLessThan(maxBucketCount, duration) {
  const maxPerBucketMs = getPerBucketMs(maxBucketCount, duration);

  for (const {
    interval
  } of boundsDescending) {
    // Find the highest interval which meets our per bucket limitation.
    if (interval <= maxPerBucketMs) {
      return _moment.default.duration(interval);
    }
  } // If the max is smaller than any of our intervals, then we'll use it for the interval as-is.


  return normalizeMinimumInterval(maxPerBucketMs);
}