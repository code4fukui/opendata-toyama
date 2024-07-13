import { CSV } from "https://js.sabae.cc/CSV.js";

const fn = "data/toyama-opendata_eatery.csv";

const url = "https://toyama-pref.box.com/shared/static/1t6074lluawpua1u5jhx1yeaynb48rle.csv";
const json = await CSV.fetchJSON(url);
json.forEach(i => {
  for (const name in i) {
    i[name] = i[name].trim();
  }
});
await Deno.writeTextFile(fn, CSV.stringify(json));
