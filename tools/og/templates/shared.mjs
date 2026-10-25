import React from "react";
import { COLORS, MARGINS } from "../constants.mjs";
import { markDataUri } from "../mark.mjs";

const h = React.createElement;

export function MarkWatermark({ variant = "light" }) {
  const primary = variant === "dark" ? "watermarkDark" : "watermarkLight";
  const secondary = variant === "dark" ? "watermarkDark" : "watermarkLight2";
  return h(
    React.Fragment,
    null,
    h("img", {
      src: markDataUri(secondary),
      width: 560,
      height: 775,
      alt: "",
      style: {
        position: "absolute",
        right: -40,
        top: -60,
        transform: "rotate(-8deg)",
      },
    }),
    h("img", {
      src: markDataUri(primary),
      width: 520,
      height: 720,
      alt: "",
      style: {
        position: "absolute",
        right: 80,
        bottom: -200,
        transform: "rotate(14deg)",
      },
    }),
  );
}

export function HeaderRow({
  markVariant = "ink",
  label = "shellui.com",
  labelColor = COLORS.ink,
  dividerColor = COLORS.gray200,
}) {
  return h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 16 } },
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

export function TitleBlock({ title, description, titleColor, descColor, titleSize = 56, maxWidth = 720 }) {
  return h(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 20, maxWidth } },
    h(
      "div",
      {
        style: {
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.08,
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
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.35,
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
        display: "flex",
        width: "100%",
        height: "100%",
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
          width: "100%",
          height: "100%",
          padding: `${MARGINS.y}px ${MARGINS.x}px`,
          position: "relative",
          zIndex: 1,
        },
      },
      children,
    ),
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
      },
    },
    h("div", { style: { width: 10, height: 10, borderRadius: 999, background: COLORS.gold } }),
    h("span", { style: { fontSize: 18, fontWeight: 500, color: text } }, label),
  );
}
