# Changelog

Todas las versiones notables de `@medical/design-system`.

## [1.0.0] — 2026-09-08

### Primer release distribuible
- El paquete se compila a `dist/` (JS ESM + `design-system.css` compilado) y se distribuye como
  dependencia local vía tarball (`artifacts/medical-design-system-1.0.0.tgz`).
- `exports` apuntan a `dist` en runtime; los **tipos** continúan resolviéndose desde `src/`.
- Nueva carpeta **`themes/`** con temas de marca listos:
  - `onco.css` (azul) y `cardio.css` (violeta), ambos con variante de modo oscuro.
  - `tema-personalizado.css`: plantilla con todos los tokens semánticos comentados.
- Subpath de exportación para temas: `@medical/design-system/themes/*`.

### Tokens y temas
- **Temas por aplicación**: cada app puede sobrescribir tokens semánticos `--color-*`
  (sin primitivos) para dar su color de marca; patrón `:root` o `:root[data-brand='…']`.
- Badge 100 % tokenizado: nuevos tokens `--badge-background-neutral-solid` y
  `--badge-text-neutral-solid` (eliminado uso directo de `--gray-600`).
- En tema claro, `--color-on-secondary` pasa a `var(--gray-0)` para que cualquier marca
  use texto blanco sobre su acento.

### Demo (apps/design-system-demo)
- Selector de tema en vivo en el header: Grove (verde), Onco (azul), Cardio (violeta),
  con variantes claras y oscuras.

### Verificación
- Smoke test headless de temas por marca y de un consumidor externo instalando el tarball
  como dependencia (React 19 + Vite 6): 0 errores de consola, 0 peticiones fallidas.