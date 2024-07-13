import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const fn = "data/toyama-opendata_event.csv";
const list = await CSV.fetch(fn) || [];

const slim = (o) => {
  const o2 = {};
  for (const name in o) {
    if (o[name] === null || o[name] === "") continue;
    o2[name] = o[name];
  }
  return o2;
};

const url = "https://opendata.pref.toyama.jp/api/action/package_show?id=94ffe110-1727-4502-9be4-38e8dbbc3f2d";
const json = await (await fetch(url)).json();
for (const res of json.result.resources) {
  if (list.find(i => i.id == res.id)) continue;
  list.push(slim(res));
}
await Deno.writeTextFile(fn, CSV.stringify(list));
