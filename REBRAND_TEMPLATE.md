# 🎨 Rebranding Template (3 Colors)

You have a 3-color palette, for example: `#f6f6f6`, `#e5c283`, `#360f10`.

## Step 1: Map your colors (by role)

```text
#f6f6f6  ← Lightest (backgrounds)
#e5c283  ← Medium (primary/accent)
#360f10  ← Darkest (text/headings)
```

## Step 2: Fill in brand tokens (app/colors.css)

Replace the top tokens with your RGB + mapped values:

```css
--brand-bg-light-rgb: 246, 246, 246; /* #f6f6f6 */
--brand-bg-light: rgb(var(--brand-bg-light-rgb));
--brand-secondary-color-rgb: 229, 194, 131; /* #e5c283 */
--brand-secondary-color: rgb(
  var(--brand-secondary-color-rgb)
);
--brand-primary-color-rgb: 229, 194, 131; /* #e5c283 */
--brand-primary-color: rgb(var(--brand-primary-color-rgb));
--brand-dark-color-rgb: 54, 15, 16; /* #360f10 */
--brand-dark-color: rgb(var(--brand-dark-color-rgb));
--brand-accent-color-rgb: 229, 194, 131; /* #e5c283 */
--brand-accent-color: rgb(var(--brand-accent-color-rgb));
--brand-highlight-color-rgb: 229, 194, 131; /* #e5c283 */
--brand-highlight-color: rgb(
  var(--brand-highlight-color-rgb)
);
```

- Reusing a color across multiple brand slots is fine.

## Step 3: Opacity helpers (automatic)

You don’t need to edit opacities. They derive from your `--brand-*-rgb` tokens in `app/color-foundations.css`:

```css
--opacity-bg-90, --opacity-bg-50, --opacity-bg-10
--opacity-primary-10, --opacity-primary-08, --opacity-primary-05
--opacity-secondary-50, --opacity-secondary-10
--opacity-accent-50, --opacity-accent-10, --opacity-accent-05
```

## Step 4: Optional section tweaks

If you want to fine-tune a section, override the section variables in `app/colors.css`:

```css
/* SERVICES */
--services-card-border-hover: var(--color-secondary);
--services-overlay: radial-gradient(
  circle at 20% 80%,
  var(--opacity-primary-08) 0%,
  transparent 50%
);
```

## Quick checklist

- [ ] Update the 6 brand tokens in `app/colors.css`
- [ ] Run `npm run dev`
- [ ] Visually QA hero, services, contact, footer

Tools: Hex ↔ RGB (`https://www.rgbtohex.net/`), Contrast (`https://webaim.org/resources/contrastchecker/`).
