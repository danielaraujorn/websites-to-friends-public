# 🚀 Quick Start

Rebrand this project in minutes using a single file.

## 1. Edit brand tokens (app/colors.css)

Update the 6 brand RGB tokens and mapped values at the top of `app/colors.css`:

```css
:root {
  /* Brand tokens (per site) */
  --brand-bg-light-rgb: 246, 246, 246; /* #f6f6f6 */
  --brand-bg-light: rgb(var(--brand-bg-light-rgb));
  --brand-secondary-color-rgb: 167, 131, 81; /* #a78351 */
  --brand-secondary-color: rgb(
    var(--brand-secondary-color-rgb)
  );
  --brand-primary-color-rgb: 212, 158, 94; /* #d49e5e */
  --brand-primary-color: rgb(
    var(--brand-primary-color-rgb)
  );
  --brand-dark-color-rgb: 3, 77, 102; /* #034d66 */
  --brand-dark-color: rgb(var(--brand-dark-color-rgb));
  --brand-accent-color-rgb: 212, 158, 94; /* #d49e5e */
  --brand-accent-color: rgb(var(--brand-accent-color-rgb));
  --brand-highlight-color-rgb: 212, 158, 94; /* #d49e5e */
  --brand-highlight-color: rgb(
    var(--brand-highlight-color-rgb)
  );
}
```

- 3-color palettes are fine: reuse the same color across multiple tokens.
- Keep hex comments as documentation; the system uses the RGB values.

## 2. No manual rgba needed

Opacity helpers derive automatically from the `--brand-*-rgb` tokens via `app/color-foundations.css`:

```css
--opacity-primary-10: rgba(
  var(--brand-primary-color-rgb),
  0.1
);
--opacity-bg-90: rgba(var(--brand-bg-light-rgb), 0.9);
--opacity-secondary-50: rgba(
  var(--brand-secondary-color-rgb),
  0.5
);
```

You do not need to edit these.

## 3. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` and verify colors across sections.

---

## Common usage examples (SCSS)

```scss
.button {
  background: var(--gradient-primary);
  color: var(--color-text-white);
  &:hover {
    background: var(--gradient-hover);
  }
}

.card {
  background: var(--color-bg-secondary);
  box-shadow: 0 4px 6px var(--opacity-black-10);
}

.input:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px var(--opacity-secondary-10);
}
```

---

- For the rationale and full token list, see `COLOR_SYSTEM.md`.
- For architecture and multi-site/i18n flow, see `ARCHITECTURE.md`.
