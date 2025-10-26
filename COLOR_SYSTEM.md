# 🎨 Color System Guide

## Quick Rebrand (3 Minutes)

1. Open `app/colors.css`
2. Update the 6 brand tokens (RGB + mapped values) at the top
3. Done — all components update automatically

Example tokens:

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

- Using only 3 colors? Reuse them across multiple brand slots.
- Opacity helpers derive from the `--brand-*-rgb` tokens — no manual rgba edits.

---

## Structure

- `app/color-foundations.css`
  - Semantic mapping (e.g., `--color-primary` → `--brand-primary-color`)
  - Computed helpers (opacity, gradients, text/background colors)
- `app/colors.css`
  - Per-site brand tokens (`--brand-*-rgb`, mapped `--brand-*`)
  - Section variables used by components (e.g., `--header-link-color`)
- Components
  - Use only section variables (never reference brand tokens directly)

---

## Usage Examples (SCSS)

```scss
/* Buttons */
.button {
  background: var(--gradient-primary);
  color: var(--color-text-white);
  &:hover {
    background: var(--gradient-hover);
  }
}

/* Cards */
.card {
  background: var(--color-bg-secondary);
  box-shadow: 0 4px 6px var(--opacity-black-10);
}

/* Text */
.title {
  color: var(--color-text-primary);
}
.description {
  color: var(--color-text-secondary);
}

/* Inputs */
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--opacity-primary-10);
}
```

Avoid hardcoded values:

```scss
/* Don’t hardcode hex or rgba */
background: #d49e5e; /* ✗ */
color: rgba(224, 111, 34, 0.1); /* ✗ */
```

---

## Why this works

- Semantic, color-agnostic names (no renaming when brands change)
- Single source of truth (6 brand tokens + foundations)
- Components stay decoupled from brand details
- Easy A/B mapping (switch which brand token feeds `--color-primary`)
- Works with 3–6 colors; repeat tokens if needed

---

## Reference

Common helpers from `color-foundations.css`:

```css
/* Opacity */
--opacity-bg-90, --opacity-bg-50, --opacity-bg-10
--opacity-primary-50, --opacity-primary-10, --opacity-primary-08, --opacity-primary-05
--opacity-secondary-50, --opacity-secondary-10
--opacity-accent-50, --opacity-accent-10, --opacity-accent-05
--opacity-white-20, --opacity-white-10, --opacity-black-30, --opacity-black-10

/* Background & text */
--color-bg-primary, --color-bg-secondary, --color-bg-transparent
--color-text-primary, --color-text-secondary, --color-text-white, --color-text-accent

/* Gradients */
--gradient-primary, --gradient-secondary, --gradient-hover, --gradient-light
```

See `ARCHITECTURE.md` for a deeper overview and `REBRAND_GUIDE.md` for step-by-step changes.
