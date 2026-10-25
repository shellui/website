import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
import { HeaderRow, ShellFrame, TitleBlock, FooterWordmark } from "./shared.mjs";

const h = React.createElement;

export function DocsTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 52 });
  return h(
    ShellFrame,
    { variant: "light" },
    h(HeaderRow, { label: meta.sectionLabel || "Docs" }),
    h(
      "div",
      { style: { display: "flex", flex: 1, alignItems: "center" } },
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
      { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between" } },
      h(FooterWordmark, { text: meta.footerUrl }),
      meta.category
        ? h(
            "span",
            {
              style: {
                fontSize: 20,
                fontWeight: 500,
                color: COLORS.gray500,
                letterSpacing: "0.04em",
              },
            },
            meta.category,
          )
        : null,
    ),
  );
}
