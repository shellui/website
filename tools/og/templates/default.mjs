import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
import { HeaderRow, ShellFrame, TitleBlock, FooterWordmark, GoldDotPill } from "./shared.mjs";

const h = React.createElement;

export function DefaultTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title);
  return h(
    ShellFrame,
    { variant: "light" },
    h(HeaderRow, { label: meta.headerText || "shellui.com" }),
    h(
      "div",
      {
        style: {
          display: "flex",
          flex: 1,
          alignItems: "center",
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
      h(TitleBlock, {
        title: text,
        description: meta.description,
        titleColor: COLORS.ink,
        descColor: COLORS.gray700,
        titleSize: fontSize,
      }),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(FooterWordmark, { text: meta.footerUrl }),
      meta.badge ? h(GoldDotPill, { label: meta.badge }) : null,
    ),
  );
}
