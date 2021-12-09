### Usage

```js
import {
  BigNumberChart2Plugin,
  BigNumberChart3Plugin,
} from '@bharatnischal/superset-custom-chart-plugin';

new BigNumberChart2Plugin().configure({ key: 'big-number2' }).register();
new BigNumberChart3Plugin().configure({ key: 'big-number3' }).register();
```

Then use it via `SuperChart`.

```js
<SuperChart
  chartType="big-number2"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```
