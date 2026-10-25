import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
import { HeaderRow, ShellFrame, TitleBlock, FooterWordmark } from "./shared.mjs";

const h = React.createElement;

export function BlogTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 54 });
  const blog = meta.blogMeta || {};
  return h(
    ShellFrame,
    { variant: "dark" },
    h(HeaderRow, {
      markVariant: "goldOnDark",
      label: meta.headerText || "Blog",
      labelColor: COLORS.white,
      dividerColor: "#374151",
    }),
    h(
      "div",
      { style: { display: "flex", flex: 1, alignItems: "center" } },
      h(TitleBlock, {
        title: text,
        description: meta.description,
        titleColor: COLORS.white,
        descColor: "#D1D5DB",
        titleSize: fontSize,
      }),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(FooterWordmark, {
        text: `${blog.author || "Shellui"} · ${blog.date || ""}`.trim(),
        color: COLORS.white,
      }),
      blog.category
        ? h(
            "div",
            {
              style: {
                padding: "10px 20px",
                borderRadius: 999,
                background: COLORS.goldOnDark,
              },
            },
            h(
              "span",
              { style: { fontSize: 18, fontWeight: 700, color: COLORS.darkBg } },
              blog.category,
            ),
          )
        : null,
    ),
  );
}
