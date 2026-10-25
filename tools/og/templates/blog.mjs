import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
import {
  HeaderRow,
  ShellFrame,
  TitleBlock,
  FooterWordmark,
  MainContent,
  FooterRow,
} from "./shared.mjs";

const h = React.createElement;

export function BlogTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 60 });
  const blog = meta.blogMeta || {};
  return h(
    ShellFrame,
    { variant: "dark" },
    h(HeaderRow, {
      markVariant: "goldOnDark",
      label: "shellui.com",
      labelColor: COLORS.white,
      dividerColor: "#374151",
    }),
    h(MainContent, null, h(TitleBlock, {
      title: text,
      description: meta.description,
      titleColor: COLORS.white,
      descColor: "#D1D5DB",
      titleSize: fontSize,
    })),
    h(
      FooterRow,
      null,
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
                flexShrink: 0,
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
