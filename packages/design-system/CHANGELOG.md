# Changelog

Todas las versiones notables de `@medical/design-system`.

## [1.1.0] — 2026-09-26

### BREAKING: el CSS ya no se inyecta solo

Antes, `import { Button } from '@medical/design-system'` arrastraba también la hoja de estilos.
A partir de ahora hay que importarla explícitamente, una vez, en el punto de entrada:

```tsx
import '@medical/design-system/styles.css'
import './styles/app.css'   // tus overrides, después
```

**Motivo:** la inyección automática filtraba una referencia a `./styles/index.scss` dentro de los
tipos publicados, lo que obligaba a cada consumidor a configurar `"types": ["vite/client"]` y
`allowArbitraryExtensions` en su tsconfig solo para poder compilar. Además, el orden de cascada
dependía del orden de los imports de JS, que es frágil cuando una app apila sus propios overrides.

**Si ya hacías esto** (que es lo que recomienda el README desde el principio), no hay nada que hacer:
el comportamiento es idéntico. g-clinica, por ejemplo, ya importaba el CSS explícitamente.

### Tipos

- Se publican **tipos compilados** (`dist/index.d.ts` y 121 declaraciones por componente). Antes
  `exports["."].types` apuntaba a `src/index.ts`, obligando al consumidor a compilar el fuente de la
  librería.
- Un consumidor con `tsconfig` limpio, sin `vite/client` y sin `allowArbitraryExtensions`, ya
  compila. Verificado con un proyecto de prueba.

### Empaquetado

- `private: true` eliminado: el paquete ya se puede publicar. `publishConfig` mantiene GitHub
  Packages con `access: restricted`.
- `react` y `react-dom` salen de `dependencies` y quedan **solo** como `peerDependencies` (con
  `devDependencies` para desarrollo). Se elimina el riesgo de dos copias de React y del
  `Invalid hook call`.
- `src/` ya no se distribuye: el paquete son los artefactos compilados.
- `sideEffects: ["**/*.css"]` para que los bundlers no eliminen el CSS del árbol.
- `prepublishOnly` → **`prepack`**, que sí se ejecuta también al empaquetar. Antes era posible
  publicar o empaquetar sin compilar.
- `LICENSE` añadido (`license: "UNLICENSED"`, uso interno). **Pendiente**: el área legal debe
  sustituir el texto antes de cualquier distribución fuera del perímetro interno.
- `engines.node: ">=20"`.

### Pruebas

- **90 pruebas** nuevas. Antes el paquete no tenía ninguna.
  - **Contrato de API pública**: los 99 exports se verifican contra una lista explícita. Si se
    borra o renombra un export, la suite falla. Antes un borrado accidental de un export no lo
    detectaba nada hasta que rompía la build de un consumidor.
  - **Render smoke**: monta los 99 exports y falla ante cualquier excepción o cualquier
    `console.error` / `console.warn`. Es la prueba que habría pillado las tres regresiones de
    `1.0.1` y `1.0.2`.
- `Stepper`: la `key` de cada paso cae al índice si `step.id` viene vacío, para que un consumidor sin
  tipos no monte la lista sin claves.
- Polyfills de jsdom (`ResizeObserver`, `DOMRect`, `matchMedia`, pointer capture) en
  `src/test-setup.ts`, que Radix necesita en los tests.

### Documentación

- README reestructurado: instalación en 4 pasos, formas de consumo, política de versionado,
  proceso de publicación y sección de troubleshooting.
- Documentada la escala de espaciado: los tokens `gap` / `padding` son **numéricos** (`"4"`), no
  tallas (`"md"`).

### Interno

- **Storybook eliminado**: no lo consumía nadie y duplicaba el trabajo del Muestrario, que queda
  como única referencia. Se retiran `.storybook/`, `tsconfig.storybook.json`, los targets de Nx, el
  plugin `@nx/storybook/plugin` y las 8 dependencias de Storybook.

---

## [1.0.2] — 2026-09-26

### Correcciones

- `Tooltip` ya no lanza `Uncaught Error: Tooltip must be used within TooltipProvider`: cada `Tooltip`
  monta su propio provider.
- Borders inválidos en `Drawer` y `Modal`.
- Imports de estilos ausentes en `MultiSelect`, `Combobox`, `Label` y los date pickers.
- `Sidebar` con toggle bidireccional: se colapsa y se expande, con `aria-expanded`, `label` y `title`.

### Verificación

- Consumidores de prueba en navegador: 0 errores de consola, 0 peticiones fallidas.

---

## [1.0.1] — 2026-09-26

### Correcciones

- Tokens de tipografía y escala de espaciado corregidos en la tabla de datos y en las cabeceras de
  sección.

---

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