"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSoon = fetchSoon;

var _constants = require("../../../constants");

var _call_client = require("./call_client");

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

/**
 * This function introduces a slight delay in the request process to allow multiple requests to queue
 * up (e.g. when a dashboard is loading).
 */
async function fetchSoon(request, options, fetchHandlers) {
  const msToDelay = fetchHandlers.getConfig(_constants.UI_SETTINGS.COURIER_BATCH_SEARCHES) ? 50 : 0;
  return delayedFetch(request, options, fetchHandlers, msToDelay);
}
/**
 * Delays executing a function for a given amount of time, and returns a promise that resolves
 * with the result.
 * @param fn The function to invoke
 * @param ms The number of milliseconds to wait
 * @return Promise<any> A promise that resolves with the result of executing the function
 */


function delay(fn, ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(fn()), ms);
  });
} // The current batch/queue of requests to fetch


let requestsToFetch = [];
let requestOptions = []; // The in-progress fetch (if there is one)

let fetchInProgress = null;
/**
 * Delay fetching for a given amount of time, while batching up the requests to be fetched.
 * Returns a promise that resolves with the response for the given request.
 * @param request The request to fetch
 * @param ms The number of milliseconds to wait (and batch requests)
 * @return Promise<SearchResponse> The response for the given request
 */

async function delayedFetch(request, options, fetchHandlers, ms) {
  if (ms === 0) {
    return (0, _call_client.callClient)([request], [options], fetchHandlers)[0];
  }

  const i = requestsToFetch.length;
  requestsToFetch = [...requestsToFetch, request];
  requestOptions = [...requestOptions, options]; // Note: the typescript here only worked because `SearchResponse` was `any`
  // Since this code is legacy, I'm leaving the any here.

  const responses = await (fetchInProgress = fetchInProgress || delay(() => {
    const response = (0, _call_client.callClient)(requestsToFetch, requestOptions, fetchHandlers);
    requestsToFetch = [];
    requestOptions = [];
    fetchInProgress = null;
    return response;
  }, ms));
  return responses[i];
}