# Changelog

Todas las versiones notables de `@danielitouci96/design-system`.

> **Nota sobre el nombre.** El paquete se llamó `@danielitouci96/design-system` hasta la versión `1.2.0`
> inclusive, pero **nunca se publicó en ningún registro**: todas esas versiones existieron solo como
> tarball local. El scope `@medical` está reservado por una organización de npm ajena a este proyecto,
> así que no era publicable. Como no había consumidores, se renombró a
> `@danielitouci96/design-system` antes de la primera publicación, y por eso las referencias antiguas
> que quedan en las entradas de abajo también se actualizaron. El nombre en npmjs es inmutable: una
> vez publicado, habría sido para siempre.

## [1.2.0] — 2026-09-27

### Fix: los componentes ya no desaparecen sobre superficies `inverse`

Un `Drawer` con `surface="inverse"` (el caso de uso más habitual: un panel esmeralda con texto
blanco) mostraba los **campos de formulario con placeholder blanco sobre fondo blanco**. El texto
era invisible. En tema oscuro no se notaba, porque ahí el fondo sí era oscuro: el bug solo se
manifestaba sobre superficies claras o saturadas.

**Causa.** Casi todos los tokens de componente están declarados en `:root` como alias:

```scss
:root {
  --input-background: var(--color-surface-elevated);
}
```

Una custom property se resuelve en el ámbito **donde fue declarada**, no donde se usa. El scope
`[data-med-surface='inverse']` re-mapeaba `--color-surface-elevated` a un lavado blanco, pero el
alias `--input-background` se había quedado clavado con el valor claro de `:root`. El Input no veía
el re-mapeo, y el placeholder blanco caía sobre el campo blanco.

**Arreglo.** Además de re-mapear los tokens base que faltaban
(`--color-surface`, `--color-surface-elevated`, `--color-surface-overlay`), se re-declaran dentro
del scope inverse **todos** los aliases que leen un token base. En total se corrigieron 11 aliases:
campos, selects, menús, popovers, cards, modales, tablas, toasts, chips, avatar y switch.

### Fix: test estructural que impide la regresión

Este era el **tercer** incidente de la misma clase, así que la invariante ahora se comprueba de
forma mecánica en vez de a ojo. `src/foundations/inverse-surface.spec.ts` recorre los archivos de
tokens y falla si encuentra algún alias declarado en `:root` que lea un token base re-mapeado y no
esté repetido dentro de `[data-med-surface='inverse']`. El mensaje de fallo nombra el token y qué
token base lee.

El test ya pagó por sí mismo: en la primera ejecución detectó cinco alias que se habían quedado
fuera, tres de ellos eliminados por error al reescribir el bloque.

### El Drawer ahora flota

`margin: 6px` y `border-radius: 8px`, para que el panel se lea como una tarjeta y no como una hoja
pegada al borde de la pantalla.

- `overflow: hidden` recorta los bordes del header y el footer a las esquinas redondeadas; sin esto
  las líneas horizontales se proyectan fuera del radio.
- `max-width` pasó de `100vw` a `calc(100vw - 2 * var(--drawer-inset))`. Con el inset a ambos lados,
  el límite anterior dejaba al drawer desbordando el viewport por el doble del inset.

### FormField: más aire entre campos apilados

`padding-bottom: 15px` en `.med-form-field`, para que un formulario largo no se lea como un bloque
indiscriminado.

### Tokens nuevos

| Token | Valor | Nota |
|---|---|---|
| `--drawer-inset` | `6px` | Separación del drawer respecto al borde del viewport |
| `--radius-drawer` | `var(--radius-sm)` | 8px |
| `--form-field-padding-bottom` | `15px` | Espacio bajo cada campo |

Los tres van como tokens, y no como píxeles sueltos en el SCSS del componente, por dos razones: se
pueden sobreescribir desde un tema sin `!important`, y `8px` deja de ser un número suelto cuando la
escala de radios cambie. `6px` y `15px` están **fuera** de la escala de espaciado (que va en
múltiplos de 4): son valores literales por decisión de diseño, y `--space-*` no los cubre a propósito.

### Registro

El paquete se publica en **npmjs** (`registry.npmjs.org`), que es el destino principal y queda como
default: `publishConfig` es `{ "access": "public" }` y **no** fija registry, a propósito.

El registry **no** va hardcodeado en el `package.json` por una razón concreta: se comprobó que,
cuando no se pasan flags, `publishConfig` gana a la configuración global. Con el registry fijado
ahí, un `npm publish` a secas mandaba el paquete a GitHub Packages y con `access: restricted`, que
es justo lo contrario de lo que se quería. Dejar el default en lo correcto es más seguro que
depender de acordarse de escribir `--registry` y `--access` en cada publicación.

**GitHub Packages** queda como canal opcional, siempre explícito:

```bash
npm publish --registry https://npm.pkg.github.com
```

Se añade `repository` para que npmjs enlace el paquete al repositorio público.

### BREAKING: licencia MIT

El paquete pasa de `UNLICENSED` a **MIT**, y este es el cambio que más afecta a quien lo consume.

Con `UNLICENSED` ("todos los derechos reservados") el paquete era público pero **no reutilizable**:
se podía descargar y leer, y nada más. Eso choca de frente con el objetivo de publicar en un
registro abierto, y ademásmanyas organizaciones tienen escáneres de dependencias que bloquean
`UNLICENSED` sin revisión manual, así que el paquete acababa siendo público e inusable a la vez.

Con MIT se puede usar, copiar, modificar, forksar y redistribuir, incluida la\> commercially, sin
pedir permiso. La contrapartida es la misma que en cualquier MIT: no hay garantía de nada y la
responsabilidad es de quien lo usa.

> El titular del copyright es `Danielitouci96`, que coincide con el scope de npm y el usuario de
> GitHub. Si el titular debe ser otra persona o la propia Softel, es un cambio de una línea en
> `LICENSE` y en el `package.json` (`license`).


## [1.1.0] — 2026-09-26

### BREAKING: el CSS ya no se inyecta solo

Antes, `import { Button } from '@danielitouci96/design-system'` arrastraba también la hoja de estilos.
A partir de ahora hay que importarla explícitamente, una vez, en el punto de entrada:

```tsx
import '@danielitouci96/design-system/styles.css'
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

- `private: true` eliminado: el paquete ya se puede publicar. El registro **no** va hardcodeado en
  el `package.json`; cada entorno declara el suyo (el de GitLab, en el grupo `SiSalud2.0`), de modo
  que el mismo paquete funciona en cualquier instancia.
- `react` y `react-dom` salen de `dependencies` y quedan **solo** como `peerDependencies` (con
  `devDependencies` para desarrollo). Se elimina el riesgo de dos copias de React y del
  `Invalid hook call`.
- `src/` ya no se distribuye: el paquete son los artefactos compilados.
- `sideEffects: ["**/*.css"]` para que los bundlers no eliminen el CSS del árbol.
- `prepublishOnly` → **`prepack`**, que sí se ejecuta también al empaquetar. Antes era posible
  publicar o empaquetar sin compilar.
- `LICENSE` añadido (`license: "UNLICENSED"`, uso interno). Sustituido por **MIT** en `1.2.0`, al
  publicarse el paquete en un registro abierto: `UNLICENSED` lo hacía público pero no reutilizable.
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
- Subpath de exportación para temas: `@danielitouci96/design-system/themes/*`.

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