import { parseSV } from "./parseSV.js";
import * as t from "https://deno.land/std/testing/asserts.ts";

Deno.test("simple", () => {
  t.assertEquals(parseSV("富山県の飲食店は？"), { s: "富山県", v: "飲食店" });
  t.assertEquals(parseSV("富山県のいいところって知ってる？"), { s: "富山県", v: "いいところ" });
  t.assertEquals(parseSV("魚津市のラーメン"), { s: "魚津市", v: "ラーメン" });
});
