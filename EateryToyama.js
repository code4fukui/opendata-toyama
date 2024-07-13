import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { parseSV } from "./parseSV.js";

//const url = "./data/toyama-opendata_eatery.csv";
const url = "https://code4fukui.github.io/opendata-toyama/data/toyama-opendata_eatery.csv";

let data = null;
const getData = async () => {
  if (data) return data;
  data = await CSV.fetchJSON(url);
  data.forEach(i => i.住所 = i.施設市町村 + i.施設住所１ + i.施設住所２);
  return data;
};

const containsObject = (o, val) => {
  for (const v of Object.values(o)) {
    if (typeof v == "string" && v.indexOf(val) >= 0) return true;
  }
  return false;
};

// 法人区分,施設屋号,施設郵便番号,施設都道府県,施設市町村,施設住所１,施設住所２,施設電話番号,許可番号,枝番,業種名,細分類名,新規許可日,許可開始日,許可終了日,廃止日,抹消日 

const alias = {
  //施設屋号: ["名前", "屋号", "お店の名前", "店名", "ショップ名"],
  施設郵便番号: ["郵便番号", "ZIP", "zip", "〒"],
  //施設都道府県: ["県"],
  //施設市町村: ["市町村", "市", "町", "村"],
  //施設住所１: ["住所", "場所", "アクセス"],
  住所: ["場所", "アクセス"],
  //施設住所２: [],
  施設電話番号: ["電話番号", "TEL"],
  //許可番号: [],
  //枝番: [],
  業種名: ["業種", "カテゴリー"],
  //細分類名: [],
  //新規許可日: null,
  //許可開始日: null,
  //許可終了日: null,
  //廃止日: null,
  //抹消日: null,
};

const getName = (v) => {
  for (const a in alias) {
    for (const obj of alias[a]) {
      if (obj == v) return a;
    }
  }
  return null;
};
const queryName = (s, v) => {
  const name = getName(v);
  if (!name) return null;
  const list = data.filter(i => {
    return containsObject(i, s) && i[name];
  });
  if (list.length == 0) {
    //return `${s}がみつかりません`;
    return null;
  } else if (list.length == 1) {
    const d = list[0];
    return `${d.施設屋号}の${v}は、${d[name]}です`;
  }
  const ss = [`${s}は${list.length}件あります`];
  for (let i = 0; i < Math.min(list.length, 10); i++) {
    const d = list[i];
    ss.push(`${d.施設屋号}の${v}は、${d[name]}`);
  }
  if (list.length > 10) {
    ss.push(`他、${list.length - 10}件あります`)
  }
  return ss.join("\n");
};

const queryList = (s, v) => {
  const list = data.filter(i => {
    return containsObject(i, s) && containsObject(i, v);
  });
  if (list.length == 0) {
    //return `${s}に${v}を含む飲食店はありません`;
    return null;
  } else if (list.length == 1) {
    const d = list[0];
    return `${d.施設市町村}${d.施設住所１}に「${d.施設屋号}」があります`;
  }
  const ss = [`${s}に${v}を含む飲食店が${list.length}件あります`];
  for (let i = 0; i < Math.min(list.length, 10); i++) {
    const d = list[i];
    ss.push(`${i + 1}. ${d.施設市町村}${d.施設住所１}の「${d.施設屋号}」`);
  }
  if (list.length > 10) {
    ss.push(`他、${list.length - 10}件あります`)
  }
  return ss.join("\n");
};

export class EateryToyama {
  async query(prompt) {
    const data = await getData();
    const { s, v } = parseSV(prompt);
    const res = queryName(s, v);
    if (res) return res;
    return queryList(s, v);
  }
};
