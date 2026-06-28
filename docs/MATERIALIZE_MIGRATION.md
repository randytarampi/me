# Materialize replacement plan

## Current usage

- 41 source files across jsx/www/letter/resume use `react-materialize` components.
- The main components in use are `Carousel`, `Col`, `Container`, `Row`, `Tab`, and `Tabs`.
- `window.M` globals appear in 3 source files: `swipeableTabs.jsx`, `ui.js`, and `www/sw/util.js`.
- `react-materialize@3.10.0` declares peer deps for React `^17` only, which is incompatible with React 19.
- `reactShim.js` walks `_reactInternals` to patch enzyme, which is brittle.

## Replacement options

1. Headless UI primitives: Radix, Headless UI.
2. MUI / Chakra.
3. Custom components.

## Phased approach

1. Replace `Tab` / `Tabs` first, since they are the most coupled to `window.M`.
2. Replace layout primitives: `Row`, `Col`, `Container`.
3. Replace `Carousel` last.

## Risk

- HIGH — imperative Materialize globals, jQuery-era patterns, and React 19 strict mode conflicts.

## Estimate

- 2-3 weeks of dedicated effort.
