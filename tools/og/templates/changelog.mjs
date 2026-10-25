import React from "react";
import { COLORS } from "../constants.mjs";
import { formatBlogDate, titleMetrics } from "../text.mjs";
import {
  HeaderRow,
  ShellFrame,
  TitleBlock,
  FooterWordmark,
  GoldDotPill,
  MainContent,
  FooterRow,
} from "./shared.mjs";

const h = React.createElement;

export function ChangelogTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 56 });
  const cl = meta.changelog || {};
  const dateLabel = cl.date ? formatBlogDate(cl.date) : "";
  return h(
    ShellFrame,
    { variant: "light" },
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 } },
      h(HeaderRow, { label: "shellui.com" }),
      cl.version
        ? h(GoldDotPill, { label: `v${cl.version}` })
        : null,
    ),
    h(
      MainContent,
      null,
      h(TitleBlock, {
        title: text,
        description: meta.description || null,
        titleColor: COLORS.ink,
        descColor: COLORS.gray700,
        titleSize: fontSize,
        maxWidth: 900,
      }),
      cl.tags?.length
        ? h(
            "div",
            { style: { display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 900, marginTop: 20 } },
            ...cl.tags.map((tag) =>
              h(
                "div",
                {
                  key: tag,
                  style: {
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: `1px solid ${COLORS.gray200}`,
                    background: COLORS.white,
                  },
                },
                h("span", { style: { fontSize: 18, fontWeight: 500, color: COLORS.gray700 } }, tag),
              ),
            ),
          )
        : null,
    ),
    h(
      FooterRow,
      null,
      h(FooterWordmark, { text: meta.footerUrl }),
      dateLabel
        ? h("span", { style: { fontSize: 20, fontWeight: 500, color: COLORS.gray500 } }, dateLabel)
        : null,
    ),
  );
}
