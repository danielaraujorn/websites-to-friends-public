# 🎨 Rebrand Guide

The only file you need: `app/colors.css`.

## 3-minute rebrand

1. Edit brand tokens at the top of `app/colors.css`:

```css
--brand-bg-light-rgb: 246, 246, 246; /* #f6f6f6 */
--brand-bg-light: rgb(var(--brand-bg-light-rgb));
--brand-secondary-color-rgb: 167, 131, 81; /* #a78351 */
--brand-secondary-color: rgb(
  var(--brand-secondary-color-rgb)
);
--brand-primary-color-rgb: 212, 158, 94; /* #d49e5e */
--brand-primary-color: rgb(var(--brand-primary-color-rgb));
--brand-dark-color-rgb: 3, 77, 102; /* #034d66 */
--brand-dark-color: rgb(var(--brand-dark-color-rgb));
--brand-accent-color-rgb: 212, 158, 94; /* #d49e5e */
--brand-accent-color: rgb(var(--brand-accent-color-rgb));
--brand-highlight-color-rgb: 212, 158, 94; /* #d49e5e */
--brand-highlight-color: rgb(
  var(--brand-highlight-color-rgb)
);
```

1. Save. Opacity helpers and gradients update automatically from the `--brand-*-rgb` tokens — no manual rgba edits.
1. Run `npm run dev` and review all sections.

## What updates automatically

- Header (scrolled bg, link states)
- Hero (bg, title gradient, image shadow)
- About, Services, Testimonials, Contact, Footer (bg, cards, focus/hover states)
- Buttons (primary/secondary gradients and hover)

## Section fine-tuning (optional)

Edit section variables in `app/colors.css` to customize specific areas, for example:

```css
/* HERO */
--hero-bg: linear-gradient(
  135deg,
  var(--brand-dark-color) 0%,
  var(--opacity-bg-50) 100%
);
--hero-title-gradient: var(--gradient-primary);
```

## Good patterns (SCSS)

```scss
.button {
  background: var(--gradient-primary);
  color: var(--color-text-white);
  &:hover {
    background: var(--gradient-hover);
  }
}

.input:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px var(--opacity-secondary-10);
}
```

Avoid:

```scss
/* Don’t hardcode brand tokens or raw rgba in components */
background: var(--brand-primary-color); /* ✗ */
color: rgba(224, 111, 34, 0.1); /* ✗ */
```

## Checklist

- [ ] Update 6 brand tokens in `app/colors.css`
- [ ] Run `npm run dev`
- [ ] Verify hover/focus states and contrast

See `COLOR_SYSTEM.md` for the rationale and a detailed reference.
