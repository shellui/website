import React from "react";
import { COLORS } from "../constants.mjs";
import { titleMetrics } from "../text.mjs";
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

export function DocsTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 58, maxChars: 80 });
  const pill = meta.category || meta.badge;
  return h(
    ShellFrame,
    { variant: "light" },
    h(HeaderRow, { label: "shellui.com" }),
    h(MainContent, null, h(TitleBlock, {
      title: text,
      description: meta.description,
      titleColor: COLORS.ink,
      descColor: COLORS.gray700,
      titleSize: fontSize,
      maxWidth: 780,
    })),
    h(
      FooterRow,
      null,
      h(FooterWordmark, { text: meta.footerUrl }),
      pill ? h(GoldDotPill, { label: pill }) : null,
    ),
  );
}
