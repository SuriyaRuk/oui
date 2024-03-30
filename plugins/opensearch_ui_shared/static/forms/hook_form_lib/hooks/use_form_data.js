"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormData = void 0;

var _react = require("react");

var _form_data_context = require("../form_data_context");

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
const useFormData = (options = {}) => {
  const {
    watch,
    form
  } = options;
  const ctx = (0, _form_data_context.useFormDataContext)();
  let getFormData;
  let getFormData$;

  if (form !== undefined) {
    getFormData = form.getFormData;
    getFormData$ = form.__getFormData$;
  } else if (ctx !== undefined) {
    ({
      getFormData,
      getFormData$
    } = ctx);
  } else {
    throw new Error('useFormData() must be used within a <FormDataContextProvider /> or you need to pass FormHook object in the options.');
  }

  const initialValue = getFormData$().value;
  const previousRawData = (0, _react.useRef)(initialValue);
  const isMounted = (0, _react.useRef)(false);
  const [formData, setFormData] = (0, _react.useState)(previousRawData.current);
  const formatFormData = (0, _react.useCallback)(() => {
    return getFormData({
      unflatten: true
    });
  }, [getFormData]);
  (0, _react.useEffect)(() => {
    const subscription = getFormData$().subscribe(raw => {
      if (watch) {
        const valuesToWatchArray = Array.isArray(watch) ? watch : [watch];

        if (valuesToWatchArray.some(value => previousRawData.current[value] !== raw[value])) {
          previousRawData.current = raw; // Only update the state if one of the field we watch has changed.

          setFormData(raw);
        }
      } else {
        setFormData(raw);
      }
    });
    return subscription.unsubscribe;
  }, [getFormData$, watch]);
  (0, _react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!isMounted.current && Object.keys(formData).length === 0) {
    // No field has mounted yet
    return [formData, formatFormData, false];
  }

  return [formData, formatFormData, true];
};

exports.useFormData = useFormData;