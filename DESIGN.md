---
name: Pluto
description: Private, open-source second brain for work on macOS
colors:
  primary: "#1A2340"
  primary-dark: "#121B2F"
  accent: "#C59B63"
  accent-soft: "#F6EFE6"
  accent-border: "#E5D7C3"
  ink: "#121B2F"
  muted: "#525E75"
  subtle: "#64748B"
  line: "#E8E2D8"
  line-strong: "#D8D0C3"
  surface: "#FFFFFF"
  surface-subtle: "#FAF8F5"
  surface-warm: "#F5F0E8"
  emerald: "#047857"
  emerald-bg: "#ECFDF5"
  amber: "#B45309"
  amber-bg: "#FEF3C7"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Albert Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Albert Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "13px 24px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "13px 24px"
---

# Design System

<!-- impeccable:design-schema 1 -->

## Overview

Pluto's design language is defined by Warm & Sophisticated executive craftsmanship. Moving away from sterile, generic tech tropes, it embodies the calm authority of an executive study: deep Midnight Blue (`#1A2340`), Champagne Gold accents (`#C59B63`), a Warm Cream editorial canvas (`#FAF8F5`), and elevated Pure White cards with soft, deep shadows.

## Colors

- **Midnight Blue (`#1A2340`)**: Primary brand tone. Deep, focused, intellectual. Used for primary buttons, active states, and brand anchors.
- **Champagne Gold (`#C59B63`)**: Elegant accent. Highlights verified badges, quotation borders, and orbital nodes.
- **Warm Cream (`#FAF8F5`)**: Background canvas. Soft on the eyes for extended reading sessions.
- **Pure White (`#FFFFFF`)**: Elevated cards, modals, and interactive stages.
- **Slate Ink (`#121B2F`)**: Primary typography with high contrast (≥ 12:1).
- **Muted Slate (`#525E75`)**: Secondary narrative body copy, guaranteed ≥ 5:1 contrast on both cream and white.
- **Warm Border (`#E8E2D8`)**: Subtle 1px structural division lines.
