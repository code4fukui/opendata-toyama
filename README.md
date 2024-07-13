# opendata-toyama
 
## opendata

- [toyama-opendata_eatery.csv](data/toyama-opendata_eatery.csv) from [食品製造・販売、飲食店、喫茶店一覧（2024年7月1日現在） | 食品製造・販売、飲食店、喫茶店一覧 | データカタログ | 富山県オープンデータポータルサイト](https://opendata.pref.toyama.jp/dataset/syokuhin/resource/984efe30-d471-41fe-a189-5a346e8ce280)

## query class

- [EateryToyama.js](EateryToyama)

```js
import { EateryToyama } from "https://code4fukui.github.io/opendata-toyama/EateryToyama.js";

const eatery = new EateryToyama();
const res = await eatery.query("魚津市の博多屋台ラーメン知ってる？");
console.log(res); // 魚津市本新町691に「博多屋台ラーメン　なかちゃん」があります
```
