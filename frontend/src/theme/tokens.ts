/**
 * Course Correct — Oxford / fellows’ lodge “ivy” tokens (MUI theme + landing).
 */
export const ivyTokens = {
  oxford: "#001f3d",
  midnight: "#05080e",
  panel: "#0a121f",
  nightVeil: "#030509",
  parchment: "#f5f1e8",
  parchmentCool: "#ebe8df",
  ivory: "#faf8f4",
  moonlight: "#e8e4dc",
  ink: "#1a1512",
  inkSoft: "#3d3835",
  moonInk: "#dce2ea",
  verseMuted: "#9aabbd",
  gold: "#c9a962",
  goldBright: "#dfc57a",
  goldBurnished: "#9e8348",
  goldGlow: "rgba(201, 169, 98, 0.22)",
  seal: "#5c1a1f",
  ruleHair: "rgba(201, 169, 98, 0.28)",
  ruleGold: "rgba(201, 169, 98, 0.55)",
  shadowLift: "0 28px 80px rgba(0, 0, 0, 0.45)",
  /** Hairlines & glass — dark surfaces */
  line: "rgba(201, 169, 98, 0.22)",
  lineNight: "rgba(255, 255, 255, 0.08)",
  glass: "rgba(255, 255, 255, 0.05)",
} as const;

export type IvyTokens = typeof ivyTokens;

/** Primary CTA hover / pressed (burnished gold) */
export const primaryHover = "#b89750";
