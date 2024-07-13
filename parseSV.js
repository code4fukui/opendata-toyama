const gobis = ["は", "とは", "って知ってる", "って何", "ってなに", "知ってる", "しってる"];

const cutGobi = (s) => {
  if (s.endsWith("?") || s.endsWith("？")) s = s.substring(0, s.length - 1);
  for (const gobi of gobis) {
    if (s.endsWith(gobi)) return s.substring(0, s.length - gobi.length);
  }
  return s;
};

export const parseSV = (prompt) => {
  const s = cutGobi(prompt);
  const no = s.lastIndexOf("の");
  if (no < 0) return false;
  const s1 = s.substring(0, no);
  const s2 = s.substring(no + 1);
  return { s: s1, v: s2 };
};
