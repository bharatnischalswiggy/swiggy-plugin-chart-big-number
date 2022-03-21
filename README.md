### Usage

```js
import { AnobisTimeSeriesLineChart, SwiggyPivotTableChartPlugin, AnomalyChartPlugin } from '@bharatnischal/superset-custom-chart-plugin';

new AnobisTimeSeriesLineChart().configure({ key: 'line_chart_anobis' }).register();
new SwiggyPivotTableChartPlugin().configure({ key: 'swiggy_pivot_table' }).register();
new AnomalyChartPlugin().configure({ key: 'swiggy_anomaly_chart' }).register();
```

Then use it via `SuperChart`.

```js
<SuperChart
  chartType="line_chart_anobis"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>

<SuperChart
  chartType="swiggy_pivot_table"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>

<SuperChart
  chartType="swiggy_anomaly_chart"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```
