"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPromiseFromStreams = createPromiseFromStreams;

var _stream = require("stream");

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
 *  Take an array of streams, pipe the output
 *  from each one into the next, listening for
 *  errors from any of the streams, and then resolve
 *  the promise once the final stream has finished
 *  writing/reading.
 *
 *  If the last stream is readable, it's final value
 *  will be provided as the promise value.
 *
 *  Errors emitted from any stream will cause
 *  the promise to be rejected with that error.
 *
 *  @param  {Array<Stream>} streams
 *  @return {Promise<any>}
 */
function isReadable(stream) {
  return 'read' in stream && typeof stream.read === 'function';
}

async function createPromiseFromStreams(streams) {
  let finalChunk;
  const last = streams[streams.length - 1];

  if (!isReadable(last) && streams.length === 1) {
    // For a nicer error than what stream.pipeline throws
    throw new Error('A minimum of 2 streams is required when a non-readable stream is given');
  }

  if (isReadable(last)) {
    // We are pushing a writable stream to capture the last chunk
    streams.push(new _stream.Writable({
      // Use object mode even when "last" stream isn't. This allows to
      // capture the last chunk as-is.
      objectMode: true,

      write(chunk, enc, done) {
        finalChunk = chunk;
        done();
      }

    }));
  }

  return new Promise((resolve, reject) => {
    // @ts-expect-error 'pipeline' doesn't support variable length of arguments
    (0, _stream.pipeline)(...streams, err => {
      if (err) return reject(err);
      resolve(finalChunk);
    });
  });
}