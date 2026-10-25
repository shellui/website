import React from "react";
import { COLORS } from "../constants.mjs";
import { formatBlogDate, titleMetrics } from "../text.mjs";
import { HeaderRow, ShellFrame, TitleBlock, FooterWordmark } from "./shared.mjs";

const h = React.createElement;

export function ChangelogTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 50 });
  const cl = meta.changelog || {};
  const dateLabel = cl.date ? formatBlogDate(cl.date) : "";
  return h(
    ShellFrame,
    { variant: "light" },
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 20 } },
      h(HeaderRow, { label: meta.headerText || "Changelog" }),
      cl.version
        ? h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                padding: "8px 16px",
                borderRadius: 999,
                border: `1px solid ${COLORS.gray200}`,
                background: COLORS.white,
              },
            },
            h("div", {
              style: { width: 10, height: 10, borderRadius: 999, background: COLORS.gold },
            }),
            h("span", { style: { fontSize: 20, fontWeight: 600, color: COLORS.ink } }, `v${cl.version}`),
          )
        : null,
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        },
      },
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
            { style: { display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 900 } },
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
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(FooterWordmark, { text: meta.footerUrl }),
      dateLabel
        ? h("span", { style: { fontSize: 20, fontWeight: 500, color: COLORS.gray500 } }, dateLabel)
        : null,
    ),
  );
}
