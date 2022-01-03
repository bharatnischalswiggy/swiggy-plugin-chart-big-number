### Usage

```js
import {
  AnobisBigNumberChartPlugin,
} from '@bharatnischal/superset-custom-chart-plugin';

new AnobisBigNumberChartPlugin().configure({ key: 'big-number-anobis' }).register();
```

Then use it via `SuperChart`.

```js
<SuperChart
  chartType="big-number-anobis"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```
