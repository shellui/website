import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
import { HeaderRow, ShellFrame, TitleBlock, FooterWordmark, GoldDotPill } from "./shared.mjs";

const h = React.createElement;

export function DocsTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 52, maxChars: 80 });
  return h(
    ShellFrame,
    { variant: "light" },
    h(HeaderRow, { label: meta.headerText || "Docs" }),
    h(
      "div",
      { style: { display: "flex", flex: 1, alignItems: "center" } },
      h(TitleBlock, {
        title: text,
        description: meta.description,
        titleColor: COLORS.ink,
        descColor: COLORS.gray700,
        titleSize: fontSize,
        maxWidth: 780,
      }),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(FooterWordmark, { text: meta.footerUrl }),
      meta.category
        ? h(GoldDotPill, { label: meta.category })
        : meta.badge
          ? h(GoldDotPill, { label: meta.badge })
          : null,
    ),
  );
}
