### Usage

```js
import { AnobisTimeSeriesLineChart } from '@bharatnischal/superset-custom-chart-plugin';

new AnobisTimeSeriesLineChart().configure({ key: 'line_chart_anobis' }).register();
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
```
