/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { t, ComparisionType } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlPanelsContainerProps,
  D3_TIME_FORMAT_DOCS,
  sharedControls,
  sections,
  formatSelectOptions,
} from '@superset-ui/chart-controls';

import { DEFAULT_FORM_DATA } from '../types';
import {
  legendSection,
  richTooltipSection,
  showValueSection,
} from '../../controls';

const {
  logAxis,
  markerEnabled,
  markerSize,
  minorSplitLine,
  rowLimit,
  truncateYAxis,
  yAxisBounds,
  zoomable,
  xAxisLabelRotation,
} = DEFAULT_FORM_DATA;
const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyTimeseriesTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['metrics'], ['adhoc_filters']],
    },
    {
      label: t('Options'),
      tabOverride: 'data',
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'suffix',
            config: {
              type: 'TextControl',
              label: 'Suffix after percentage calculation',
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'time_compare',
            config: {
              type: 'SelectControl',
              multi: false,
              freeForm: true,
              label: t('Time shift'),
              choices: formatSelectOptions([
                '1 day ago',
                '1 week ago',
                '28 days ago',
                '30 days ago',
              ]),
              description: t(
                'Overlay one or more timeseries from a ' +
                  'relative time period. Expects relative time deltas ' +
                  'in natural language (example:  24 hours, 7 days, ' +
                  '52 weeks, 365 days). Free text is supported.',
              ),
            },
          },
        ],
        [
          {
            name: 'comparison_type',
            config: {
              type: 'SelectControl',
              label: t('Calculation type'),
              default: 'values',
              choices: [[ComparisionType.Values, 'Actual values']],
              description: t(
                'How to display time shifts: as individual lines; as the ' +
                  'absolute difference between the main time series and each time shift; ' +
                  'as the percentage change; or as the ratio between series and time shifts.',
              ),
              visibility: () => false,
            },
          },
        ],
        [
          {
            name: 'is_percentage_change',
            config: {
              type: 'CheckboxControl',
              label: 'Is percentage change metric',
              default: true,
              description:
                'Whether the comparison of metric is percentage based or not (absolute)',
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'positive_color',
            config: {
              type: 'ColorPickerControl',
              label: 'positive percentage change color',
              renderTrigger: true,
              default: { r: 166, g: 197, b: 63, a: 1 },
            },
          },
          null,
        ],
        [
          {
            name: 'negative_color',
            config: {
              type: 'ColorPickerControl',
              label: 'negative percentage change color',
              renderTrigger: true,
              default: { r: 238, g: 88, b: 73, a: 1 },
            },
          },
          null,
        ],
        ['color_scheme'],
        ...showValueSection,
        [
          {
            name: 'markerEnabled',
            config: {
              type: 'CheckboxControl',
              label: t('Marker'),
              renderTrigger: true,
              default: markerEnabled,
              description: t(
                'Draw a marker on data points. Only applicable for line types.',
              ),
            },
          },
        ],
        [
          {
            name: 'markerSize',
            config: {
              type: 'SliderControl',
              label: t('Marker Size'),
              renderTrigger: true,
              min: 0,
              max: 20,
              default: markerSize,
              description: t(
                'Size of marker. Also applies to forecast observations.',
              ),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.markerEnabled?.value),
            },
          },
        ],
        [
          {
            name: 'zoomable',
            config: {
              type: 'CheckboxControl',
              label: t('Data Zoom'),
              default: zoomable,
              renderTrigger: true,
              description: t('Enable data zooming controls'),
            },
          },
        ],
        ...legendSection,
        [<h1 className="section-header">{t('X Axis')}</h1>],
        [
          {
            name: 'x_axis_time_format',
            config: {
              ...sharedControls.x_axis_time_format,
              default: 'smart_date',
              description: `${D3_TIME_FORMAT_DOCS}. ${t(
                'When using other than adaptive formatting, labels may overlap.',
              )}`,
            },
          },
        ],
        [
          {
            name: 'xAxisLabelRotation',
            config: {
              type: 'SelectControl',
              freeForm: true,
              clearable: false,
              label: t('Rotate x axis label'),
              choices: [
                [0, '0??'],
                [45, '45??'],
              ],
              default: xAxisLabelRotation,
              renderTrigger: true,
              description: t(
                'Input field supports custom rotation. e.g. 30 for 30??',
              ),
            },
          },
        ],
        // eslint-disable-next-line react/jsx-key
        ...richTooltipSection,
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Y Axis')}</h1>],

        ['y_axis_format'],
        [
          {
            name: 'logAxis',
            config: {
              type: 'CheckboxControl',
              label: t('Logarithmic y-axis'),
              renderTrigger: true,
              default: logAxis,
              description: t('Logarithmic y-axis'),
            },
          },
        ],
        [
          {
            name: 'minorSplitLine',
            config: {
              type: 'CheckboxControl',
              label: t('Minor Split Line'),
              renderTrigger: true,
              default: minorSplitLine,
              description: t('Draw split lines for minor y-axis ticks'),
            },
          },
        ],
        [
          {
            name: 'truncateYAxis',
            config: {
              type: 'CheckboxControl',
              label: t('Truncate Y Axis'),
              default: truncateYAxis,
              renderTrigger: true,
              description: t(
                'Truncate Y Axis. Can be overridden by specifying a min or max bound.',
              ),
            },
          },
        ],
        [
          {
            name: 'y_axis_bounds',
            config: {
              type: 'BoundsControl',
              label: t('Y Axis Bounds'),
              renderTrigger: true,
              default: yAxisBounds,
              description: t(
                'Bounds for the Y-axis. When left empty, the bounds are ' +
                  'dynamically defined based on the min/max of the data. Note that ' +
                  "this feature will only expand the axis range. It won't " +
                  "narrow the data's extent.",
              ),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.truncateYAxis?.value),
            },
          },
        ],
      ],
    },
  ],
  controlOverrides: {
    row_limit: {
      default: rowLimit,
    },
  },
};

export default config;
