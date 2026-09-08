# @medical/design-system

Design System profesional, reutilizable, versionable y desacoplado para la plataforma médica.
Independiente del dominio médico: es infraestructura de UI, no lógica clínica.

**Lenguaje visual — Grove AI.** Lienzo blanco / mist-gray, una sola píldora de verde bosque como
acento, tinta `#1c1c1e` para acciones primarias, tipografías **Geist** (interfaz) + **Libre Caslon
Text** (display editorial), radios de 8–24px, bordes hairline y sombras suaves.

Stack: **React + TypeScript + Radix UI + lucide-react + SCSS + CSS Custom Properties**.
No depende de Tailwind.

---

## Índice

1. [Requisitos](#requisitos)
2. [Instalación y consumo](#instalación-y-consumo)
3. [Uso básico](#uso-básico)
4. [Estilos y tokens](#estilos-y-tokens)
5. [Tema claro / oscuro](#tema-claro--oscuro)
6. [Iconos](#iconos)
7. [Accesibilidad](#accesibilidad)
8. [Estructura del paquete](#estructura-del-paquete)
9. [Documentación de referencia](#documentación-de-referencia)
10. [Buenas prácticas](#buenas-prácticas)

---

## Requisitos

- Node.js ≥ 20
- React `^18.0.0 || ^19.0.0` y `react-dom` (peer dependencies)
- Vite (recomendado) u otro bundler que procese SCSS
- Dentro de este monorepo Nx (consumo por fuente)

El paquete es `private: true` y se consume por **fuente** (`src/index.ts`). No está publicado en
ningún registry; el consumo real ocurre en las aplicaciones del monorepo.

---

## Instalación y consumo

### Dentro del monorepo

El path ya está resuelto en `tsconfig.base.json`:

```json
"paths": {
  "@medical/design-system": ["packages/design-system/src/index.ts"]
}
```

Importa desde el paquete, nunca desde rutas internas:

```tsx
import { Button, Tag } from '@medical/design-system';
```

**Los estilos se cargan solos.** `src/index.ts` importa `./styles/index.scss`, así que con Vite los
estilos (tokens globales + componentes) se incluyen en el bundle automáticamente. No necesitas
importar CSS manualmente.

### Fuentes

El DS define `--font-sans` (Geist) y `--font-serif` (Libre Caslon), pero **no** empaqueta las
fontfaces. Cada app debe instalarlas (como hace la demo):

```bash
npm install @fontsource-variable/geist @fontsource/libre-caslon-text
```

```tsx
// src/main.tsx de la app
import '@fontsource-variable/geist';
import '@fontsource/libre-caslon-text';
import '@fontsource/libre-caslon-text/400.css';
import '@fontsource/libre-caslon-text/400-italic.css';
```

---

## Uso básico

```tsx
import {
  Alert,
  Badge,
  Button,
  DataTable,
  Input,
  Modal,
  Select,
  SelectItem,
  Tag,
  type DataTableColumn,
} from '@medical/design-system';

export function PanelEstudio() {
  return (
    <>
      <Alert tone="success" title="Enmienda sincronizada">
        La cohorte de dosis fue aprobada por la junta de revisión institucional.
      </Alert>

      <Button variant="primary" iconRight="ArrowRight">
        Iniciar estudio
      </Button>
      <Button variant="outline" iconLeft="Filter">
        Criterios de filtro
      </Button>

      <Tag tone="success" icon="Check">HER2+ confirmado</Tag>
      <Badge tone="info">Evaluando in silico</Badge>

      <Input placeholder="Filtrar por ID de sujeto…" fullWidth />

      <Select placeholder="Paradigma de dosificación" fullWidth>
        <SelectItem value="adaptativa">Titulación adaptativa</SelectItem>
        <SelectItem value="fija">Fija · 300 mg semanales</SelectItem>
      </Select>

      <Modal trigger={<Button>Ver detalle</Button>} title="Detalle de cohorte">
        Contenido…
      </Modal>
    </>
  );
}
```

### DataTable con tipado estricto

```tsx
interface Cohorte { id: string; biomarcador: string; adherencia: number }

const columnas: DataTableColumn<Cohorte>[] = [
  { id: 'id', accessorKey: 'id', header: 'ID de sujeto' },
  {
    id: 'biomarcador',
    header: 'Fenotipo',
    cell: (row) => <Tag tone="success">{row.biomarcador}</Tag>,
  },
  {
    id: 'adherencia',
    accessorKey: 'adherencia',
    header: 'Adherencia',
    cell: (row) => `${row.adherencia}%`,
  },
];

<DataTable<Cohorte>
  columns={columnas}
  data={datos}
  getRowId={(r) => r.id}
  striped
  pagination={{ page, pageCount, onPageChange: setPage, totalItems: 128 }}
/>
```

Soporta: ordenación, selección de filas, `renderRowActions`, esqueletos de carga, estados de error,
paginación con selector de tamaño de página y modo denso.

---

## Estilos y tokens

Todos los tokens se exponen como **CSS Custom Properties** una vez importada la librería.
Puedes usarlos en tu propio SCSS/CSS:

```scss
.panel-oncologico {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
}
```

### Grupos de variables (rutas en `src/foundations/tokens/`)

| Grupo | Archivo(s) | Ejemplos |
|---|---|---|
| Colores semánticos | `colors/_semantic.scss` | `--color-primary`, `--color-secondary`, `--color-surface`, `--color-surface-elevated`, `--color-surface-sunken`, `--color-text-primary/secondary/tertiary`, `--color-divider`, `--color-border(-subtle/strong)`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info`, `--color-link` |
| Colores primitivos | `colors/_primitive.scss` | `--gray-0…950`, `--grove-50…950`, `--red-50…950`, `--yellow-50…950` |
| Tipografía | `typography/_primitive.scss` y `_semantic.scss` | `--font-sans`, `--font-serif`, `--font-mono`, `--font-size-2xs…7xl`, `--font-weight-*`, `--font-label-*`, `--font-heading-*`, `--font-display`, `--letter-spacing-*`, `--line-height-*` |
| Espaciado | `spacing/` | `--space-1…24`, `--space-component-*` |
| Radios | `radius/_semantic.scss` | `--radius-control`, `--radius-card`, `--radius-modal`, `--radius-table`, `--radius-full` |
| Sombras | `shadows/_semantic.scss` | `--shadow-card`, `--shadow-modal`, `--shadow-popover`, `--shadow-menu`, `--shadow-hairline` |
| Tokens de componente | `component/` | `--card-*`, `--table-*`, `--badge-*`, `--tag-*`, `--alert-*`, `--button-*`, `--input-*` (mira cada archivo) |

Los tokens de componente se pueden **sobrescribir a nivel de contenedor** para variantes locales:

```scss
.mis-tarjetas {
  --card-radius: 24px;
  --card-shadow: 0 20px 40px rgb(16 24 40 / 0.08);
}
```

---

## Tema claro / oscuro

El DS es claro por defecto y define overrides en `:root[data-theme='dark']`.
Para cambiar de tema en una app:

```ts
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  // persiste: localStorage / cookie / preferencia de usuario
}
```

Los componentes y tokens reaccionan automáticamente; la app no necesita estilos extra.

---

## Temas por aplicación (colores distintos por app)

Cada app puede tener **su propio tema de marca** sobrescribiendo tokens **semánticos**
(`--color-*`) en su propio CSS. Los componentes del DS leen `--color-*`, así que **no hay que
tocar el paquete**: solo redefinir tokens.

### A) Un tema por app (lo más común)

Crea en tu app un archivo de tema, p. ej. `src/styles/tema.css`, y **impórtalo después del DS**:

```css
/* src/styles/tema.css */
:root {
  --color-secondary: #075d9e;            /* tu color de marca / acento */
  --color-secondary-hover: #064a7e;
  --color-secondary-soft: #e6f1fa;
  --color-on-secondary: #ffffff;         /* texto encima del acento */
  --color-link: #075d9e;
  --color-link-hover: #064a7e;
  --color-border-focus: #075d9e;         /* anillos de foco */
  --color-selection-bg: #075d9e;         /* selección de texto */
}
```

Con esto botones de acento, logo, enlaces, badges, focus rings y selección cambian solos.

### B) Varios temas en una misma app (white-label / multi-marca)

Usa un selector **scoped** que tu app controla (por ejemplo `data-brand`):

```css
:root[data-brand='clinicA'] {
  --color-secondary: #7050c8;
  --color-secondary-hover: #5a3cc0;
  --color-secondary-soft: #f0ecfd;
}

:root[data-brand='clinicB'] {
  --color-secondary: #075d9e;
  --color-secondary-soft: #e6f1fa;
}
```

```tsx
document.documentElement.dataset.brand = 'clinicA'; // o en un contenedor <div data-brand="clinicA">
```

### Modo oscuro

Si tu tema necesita colores distintos en oscuro, define la variante con los **dos atributos**:

```css
:root[data-brand='clinicA'][data-theme='dark'] {
  --color-secondary: #9d87ef;
  --color-secondary-hover: #b6a4f4;
  --color-secondary-soft: #221a45;
  --color-on-secondary: #120d26;
}
```

### Plantilla y temas listos

El paquete incluye la carpeta **`themes/`** listos para copiar o importar:

| Archivo | Qué es |
|---|---|
| `themes/tema-personalizado.css` | **Plantilla** con todos los tokens semánticos comentados (luz + oscuro). Cópialo a tu app y descomenta lo que cambies. |
| `themes/onco.css` | Tema de marca **azul** (con su modo oscuro). |
| `themes/cardio.css` | Tema de marca **violeta** (con su modo oscuro). |

**Tema listo para aplicar a toda la app** (impórtalo después del DS):

```tsx
import '@medical/design-system';
import '@medical/design-system/themes/onco.css'; // o cardio.css / tu tema copiado
```

> **Cómo importarlo según tu app**
> - **Fuera del monorepo (paquete publicado):** el subpath `@medical/design-system/themes/...`
>   funciona gracias al campo `exports` del paquete. Nada que configurar.
> - **Dentro del monorepo con Vite (como la demo):** configura el alias
>   `@medical/design-system/themes → packages/design-system/themes/` (mira
>   `apps/design-system-demo/vite.config.ts`).
> - **Atajo sin aliases:** copia el archivo a tu app (`src/styles/tema.css`) e impórtalo
>   con una ruta relativa: `import './styles/tema.css';`

**Multi-marca**: abre el archivo de tema y cambia el selector de `:root` a
`:root[data-brand='miCliente']` (y su variante oscura con `[data-theme='dark']`).

Si publicas el paquete como dependencia, `themes/` viaja incluido en el artefacto
(campo `files` de `package.json` y export `@medical/design-system/themes/*`).

### Reglas

1. Sobrescribe **semánticos** (`--color-*`), nunca primitivos (`--gray-*`, `--grove-*`).
   Así el resto del sistema (estados focus, contrastes del modo oscuro) sigue coherente.
2. Si tu CSS de tema se carga después del DS, ganas por cascada; si lo cargas antes, usa
   `:root` con la misma especificidad o un selector con `data-brand`.
3. El verde de `success` se mantiene por defecto (es el color "OK" clínico) — sobrescríbelo con
   `--color-success` solo si quieres cambiarlo.
4. **Ejemplo en vivo:** la demo (`apps/design-system-demo`, puerto 4401) tiene un selector de tema
   en el header (Grove verde / Onco azul / Cardio violeta) que muestra exactamente este patrón,
   incluyendo las variantes oscuras. Revisa `apps/design-system-demo/src/styles.scss` (sección
   "TEMAS DE MARCA").

---

## Iconos

`Icon` expone todo el set de **lucide-react**:

```tsx
import { Icon } from '@medical/design-system';

<Icon name="Search" size="sm" />
<Icon name="Bell" size="md" color="var(--color-text-secondary)" label="Notificaciones" />
```

- `size`: `xs | sm | md | lg | xl` (o un número en px).
- `name` está tipado: `IconName = keyof typeof LucideIcons`.
- Sin `label` el icono es `aria-hidden`; con `label` se vuelve accesible.
- Los componentes que admiten iconos lo hacen por nombre: `Button iconLeft="Plus"` /
  `iconRight="ArrowRight"`, `Tag icon="Check"`, `IconButton icon="MoreVertical"`.

---

## Accesibilidad

Los controles interactivos usan **Radix UI**: Switch, Select, Checkbox, RadioGroup, Modal/Dialog,
Drawer, DropdownMenu, Tooltip, Popover, Tabs, Slider, Toast, Avatar.
Esto aporta ARIA, navegación por teclado, gestión de foco y `data-state` listos para estilar.

Los componentes simples (Button, DataTable, Pagination…) implementan sus atributos accesibles de
forma nativa (aria-label requerido en IconButton, `aria-sort` en tablas ordenables, etc.).

---

## Estructura del paquete

```
packages/design-system/
├─ src/
│  ├─ index.ts                  ← ÚNICA API pública (todos los exports)
│  ├─ styles/index.scss         ← hoja global (tokens + reset + utilidades)
│  ├─ foundations/
│  │  ├─ tokens/                ← tokens SCSS (colors, typography, spacing, radius, shadows, component)
│  │  └─ breakpoints/           ← mixins responsive
│  ├─ primitives/               ← Box, Stack, Inline, Grid, Container, Text, Heading, Link, Divider
│  ├─ components/               ← componentes (ver catálogo abajo)
│  └─ icons/Icon.tsx            ← Icon (lucide-react)
├─ themes/                      ← plantilla de tema + temas de marca listos (onco, cardio)
├─ dist/                        ← salida del build (vite build)
└─ package.json
```

### Catálogo de componentes

- **Primitivos:** Box · Stack · Inline · Grid · Container · Text · Heading · Link · Divider
- **Botones:** Button · IconButton · ButtonGroup
- **Entradas:** FormField · Label · Input · Textarea · PasswordInput · SearchInput · NumberInput ·
  Select(+Item) · MultiSelect · Combobox · Checkbox · RadioGroup · Switch · Slider
- **Feedback:** Alert · Toast · Spinner · Skeleton · Progress
- **Superficies / overlays:** Card · Modal · ConfirmDialog · Drawer · Popover · Tooltip ·
  DropdownMenu
- **Datos:** Badge · Tag · Chip · Avatar · StatusIndicator · DataTable · Table · Pagination
- **Navegación:** Navbar · Sidebar · Tabs · Stepper · Breadcrumb
- **Extras:** Calendar · Icon

---

## Documentación de referencia

- **Demo viva (biblioteca de componentes):** `apps/design-system-demo` →
  levantarla con `npx nx run design-system-demo:dev` (http://localhost:4401).
  Muestra el sistema Grove en acción: header, métricas, botones, tabla de datos, formularios,
  feedback, dark mode y tokens.
- **API pública:** `src/index.ts`, cada export está comentado.
- **Props y tipos:** JSDoc en el `.tsx` de cada componente.
- **Storybook:** configurado en este paquete (`npm run storybook`, puerto 4400) pero desactivado
  por defecto; se activa bajo demanda.

---

## Buenas prácticas

1. **Importa solo de `@medical/design-system`.** Nunca rutas internas (`src/components/...`).
   Es la garantía de tree-shaking y de que la API no se fragmente.
2. **No añadas Tailwind** sobre este DS. Usa los tokens CSS y las clases del paquete.
3. **Espacio plano, rutas absolutas** en la integración (sin `cd`, sin rutas relativas frágiles).
4. **No repitas estilos de componentes**: aprovecha la sobrescritura de tokens en lugar de CSS de
   la app, salvo para layout específico de página.
5. **Usa los componentes de la tabla/overlay ya existentes** (DataTable, Modal, Toast) en lugar de
   reinventarlos; están tipados, son accesibles y siguen el lenguaje Grove.
6. **Iconos siempre por nombre** con `aria-label` cuando el icono sea el único contenido del botón.
7. **Para cambios visuales globales**, edita los tokens (en `foundations/tokens/`), no el CSS de
   cada componente. Así el cambio se propaga a todas las apps.

---

© 2026 Plataforma médica — Uso interno. Conforme a GCP / 21 CFR Parte 11 en las apps consumidoras.