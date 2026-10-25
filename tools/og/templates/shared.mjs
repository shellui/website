import React from "react";
import { COLORS, MARGINS } from "../constants.mjs";
import { markDataUri } from "../mark.mjs";

const h = React.createElement;

export function DecorativeShapes({ variant = "light" }) {
  const fill = variant === "dark" ? "#111827" : COLORS.gray200;
  const fill2 = variant === "dark" ? "#1F2937" : COLORS.gray100;
  return h(
    React.Fragment,
    null,
    h("div", {
      style: {
        position: "absolute",
        right: -80,
        top: 40,
        width: 520,
        height: 520,
        borderRadius: 140,
        background: fill2,
        transform: "rotate(-12deg)",
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        right: 40,
        bottom: -120,
        width: 420,
        height: 420,
        borderRadius: 120,
        background: fill,
        transform: "rotate(18deg)",
      },
    }),
  );
}

export function HeaderRow({ markVariant = "ink", label, labelColor = COLORS.ink, dividerColor = COLORS.gray200 }) {
  return h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 16 } },
    h("img", { src: markDataUri(markVariant), width: 28, height: 38, alt: "" }),
    label
      ? h(
          React.Fragment,
          null,
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
        )
      : null,
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
    h(DecorativeShapes, { variant }),
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
