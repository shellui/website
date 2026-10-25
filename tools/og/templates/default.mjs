import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
import { HeaderRow, ShellFrame, TitleBlock, FooterWordmark } from "./shared.mjs";

const h = React.createElement;

export function DefaultTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title);
  return h(
    ShellFrame,
    { variant: "light" },
    h(HeaderRow, { label: meta.sectionLabel || null }),
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
      meta.badge
        ? h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                borderRadius: 999,
                border: `1px solid ${COLORS.gray200}`,
                background: COLORS.white,
              },
            },
            h("div", {
              style: { width: 10, height: 10, borderRadius: 999, background: COLORS.gold },
            }),
            h("span", { style: { fontSize: 18, fontWeight: 500, color: COLORS.gray700 } }, meta.badge),
          )
        : null,
    ),
  );
}
