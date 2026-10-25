import React from "react";
import { COLORS, OG_HEIGHT, OG_WIDTH, MARGINS } from "../constants.mjs";
import { markDataUri } from "../mark.mjs";

const h = React.createElement;

/** Large brand mark watermark bleeding off the right edge (kit og-default). */
export function MarkWatermark({ variant = "light" }) {
  const fill = variant === "dark" ? "watermarkDark" : "watermarkLight";
  return h("img", {
    src: markDataUri(fill),
    width: 720,
    height: 996,
    alt: "",
    style: {
      position: "absolute",
      right: -200,
      top: -80,
      opacity: variant === "dark" ? 0.35 : 1,
    },
  });
}

export function HeaderRow({
  markVariant = "ink",
  label = "shellui.com",
  labelColor = COLORS.ink,
  dividerColor = COLORS.gray200,
}) {
  return h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 16, flexShrink: 0 } },
    h("img", { src: markDataUri(markVariant), width: 28, height: 38, alt: "" }),
    h("div", { style: { width: 1, height: 28, background: dividerColor } }),
    h(
      "span",
      {
        style: {
          fontSize: 22,
          fontWeight: 500,
          color: labelColor,
          letterSpacing: "-0.02em",
        },
      },
      label,
    ),
  );
}

export function TitleBlock({
  title,
  description,
  titleColor,
  descColor,
  titleSize = 60,
  maxWidth = 760,
}) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22,
        maxWidth,
      },
    },
    h(
      "div",
      {
        style: {
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: "-0.03em",
          color: titleColor,
        },
      },
      title,
    ),
    description
      ? h(
          "div",
          {
            style: {
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.4,
              color: descColor,
            },
          },
          description,
        )
      : null,
  );
}

export function ShellFrame({ variant = "light", children }) {
  const bg = variant === "dark" ? COLORS.darkBg : COLORS.canvas;
  return h(
    "div",
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        flexDirection: "column",
        background: bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter",
      },
    },
    h(MarkWatermark, { variant }),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: OG_WIDTH,
          height: OG_HEIGHT,
          padding: `${MARGINS.y}px ${MARGINS.x}px`,
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        },
      },
      children,
    ),
  );
}

export function MainContent({ children }) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        flexGrow: 1,
        flexShrink: 1,
        paddingTop: 40,
        paddingBottom: 24,
        minHeight: 0,
      },
    },
    children,
  );
}

export function FooterRow({ children }) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        width: "100%",
      },
    },
    children,
  );
}

export function FooterWordmark({ text, color = COLORS.ink }) {
  return h(
    "span",
    { style: { fontSize: 24, fontWeight: 700, color, letterSpacing: "-0.02em" } },
    text,
  );
}

export function GoldDotPill({ label, variant = "light" }) {
  const border = variant === "dark" ? "#374151" : COLORS.gray200;
  const bg = variant === "dark" ? "#111827" : COLORS.white;
  const text = variant === "dark" ? "#D1D5DB" : COLORS.gray700;
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: bg,
        flexShrink: 0,
      },
    },
    h("div", { style: { width: 10, height: 10, borderRadius: 999, background: COLORS.gold } }),
    h("span", { style: { fontSize: 18, fontWeight: 500, color: text } }, label),
  );
}
