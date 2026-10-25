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

export function DefaultTemplate(meta) {
  const { fontSize, text } = titleMetrics(meta.title, { baseSize: 60 });
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
    })),
    h(
      FooterRow,
      null,
      h(FooterWordmark, { text: meta.footerUrl }),
      meta.badge ? h(GoldDotPill, { label: meta.badge }) : null,
    ),
  );
}
