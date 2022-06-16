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
import { Preset } from '@superset-ui/core';
import { AnobisTimeSeriesLineChart } from './Echarts';
import { SwiggyPivotTableChartPlugin } from './PivotTable';
import AnomalyChartPlugin from './AnomalyChart';
import AnomalyPointChartPlugin from './AnomalyPoint/MixedTimeseries';

export default class AnobisChartPreset extends Preset {
  constructor() {
    super({
      name: 'Anobis big number and line chart',
      plugins: [
        new AnobisTimeSeriesLineChart().configure({ key: 'anobis_line_chart' }),
        new SwiggyPivotTableChartPlugin().configure({
          key: 'swiggy_pivot_table',
        }),
        new AnomalyChartPlugin().configure({
          key: 'anomaly_chart',
        }),
        new AnomalyPointChartPlugin().configure({
          key: 'anomaly_point_chart',
        }),
      ],
    });
  }
}
