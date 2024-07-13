import { EateryToyama } from "./EateryToyama.js";
import * as t from "https://deno.land/std/testing/asserts.ts";

Deno.test("simple", async () => {
  const eatery = new EateryToyama();
  t.assertEquals(await eatery.query("魚津市のラーメンは？"), "魚津市にラーメンを含む飲食店が5件あります\n" +
     "1. 魚津市上村木2-16-30の「ラーメンの店」\n" +
     "2. 魚津市吉島67-1の「ラーメン　はじめ家」\n" +
     "3. 魚津市上村木1-17-8の「山久ラーメン」\n" +
     "4. 魚津市本新町691の「博多屋台ラーメン　なかちゃん」\n" +
     "5. 魚津市上村木２－１５－１７の「ラーメンむてっぽう　魚津店」");
  t.assertEquals(await eatery.query("魚津市の博多は？"), "魚津市本新町691に「博多屋台ラーメン　なかちゃん」があります");
  //t.assertEquals(await eatery.query("射水市の鍋"), "射水市に鍋を含む飲食店はありません");
  t.assertEquals(await eatery.query("射水市の鍋"), null);
  t.assertEquals(await eatery.query("魚津市の鍋"), "魚津市駅前新町5-30サンプラザ２Fに「もつ鍋・焼肉　円笑」があります");
});
Deno.test("tel", async () => {
  const eatery = new EateryToyama();
  t.assertEquals(await eatery.query("山久ラーメンの電話番号？"), "山久ラーメンの電話番号は、0765-22-8213です");
  t.assertEquals(await eatery.query("博多屋台の電話番号？"), "博多屋台ラーメン　なかちゃんの電話番号は、0765-32-4669です");
  t.assertEquals(await eatery.query("博多のアクセス知ってる？"), "博多は2件あります\n" + 
    "博多らーめん　山桜のアクセスは、高岡市新成町1-90\n" +
    "博多屋台ラーメン　なかちゃんのアクセスは、魚津市本新町691");
  t.assertEquals(await eatery.query("山久ラーメンのアクセスって知ってる？"), "山久ラーメンのアクセスは、魚津市上村木1-17-8です");
  t.assertEquals(await eatery.query("山久ラーメンの業種は？"), "山久ラーメンの業種は、飲食店営業です");
  t.assertEquals(await eatery.query("大黒の電話番号"), "大黒家の電話番号は、0763-33-1598です");
});
