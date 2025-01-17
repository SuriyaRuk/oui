"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractJSONStringValues = void 0;

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
const JSON_COLON = ':';
const JSON_STRING_DELIMITER = '"';
const JSON_STRING_ESCAPE = '\\';
/**
 * Accepts JSON (as a string) and extracts the positions of all JSON string
 * values.
 *
 * For example:
 *
 * '{ "my_string_value": "is this", "my_number_value": 42 }'
 *
 * Would extract one result:
 *
 * [ { startIndex: 21, endIndex: 29 } ]
 *
 * This result maps to `"is this"` from the example JSON.
 *
 */

const extractJSONStringValues = input => {
  let position = 0;
  let currentStringStartPos;
  let isInsideString = false;
  const stringValues = [];

  function read() {
    return input[position];
  }

  function peekNextNonWhitespace() {
    let peekPosition = position + 1;

    while (peekPosition < input.length) {
      const peekChar = input[peekPosition];

      if (peekChar.match(/[^\s\r\n]/)) {
        return peekChar;
      }

      ++peekPosition;
    }
  }

  function advance() {
    ++position;
  }

  while (position < input.length) {
    const char = read();

    if (!isInsideString) {
      if (char === JSON_STRING_DELIMITER) {
        currentStringStartPos = position;
        isInsideString = true;
      } // else continue scanning for JSON_STRING_DELIMITER

    } else {
      if (char === JSON_STRING_ESCAPE) {
        // skip ahead - we are still inside of a string
        advance();
      } else if (char === JSON_STRING_DELIMITER) {
        if (peekNextNonWhitespace() !== JSON_COLON) {
          stringValues.push({
            startIndex: currentStringStartPos,
            endIndex: position
          });
        }

        isInsideString = false;
      }
    }

    advance();
  }

  return {
    stringValues
  };
};

exports.extractJSONStringValues = extractJSONStringValues;