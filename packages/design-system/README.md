# @danielitouci96/design-system

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
10. [Versionado](#versionado)
11. [Publicar una versión](#publicar-una-versión)
12. [Troubleshooting](#troubleshooting)
13. [Buenas prácticas](#buenas-prácticas)

---

## Requisitos

- Node.js ≥ 20
- React `^18.0.0 || ^19.0.0` y `react-dom` (peer dependencies: los aporta la app, no el paquete)
- TypeScript ≥ 5.0 (para los tipos que ya se distribuyen compilados)
- Cualquier bundler: Vite, webpack, Rollup… **no hace falta que processe SCSS**, el paquete
  entrega el CSS ya compilado

No necesitas configurar `vite/client` ni `allowArbitraryExtensions` en el tsconfig de tu app:
los tipos se distribuyen compilados en `dist/index.d.ts` y no contienen referencias a `.scss`.

### Formas de consumir el paquete

Versión actual: **`1.2.0`**.

| Vía | Cuándo | Cómo |
|---|---|---|
| **Registro con SemVer** *(recomendada)* | Apps de tu equipo, incluso fuera del monorepo | `"@danielitouci96/design-system": "^1.2.0"` |
| **Tarball local `.tgz`** | Sin registry, red aislada o para probar un release puntual | `npm install ../medical-platform/artifacts/medical-design-system-1.2.0.tgz` |
| **Por fuente (monorepo Nx)** | Desarrollo diario dentro de `medical-platform` | Alias ya resuelto en `tsconfig.base.json` |

La vía con SemVer es la recomendada porque el consumidor escribe una versión y la va actualizando
con `npm update`, en vez de tener que editar una ruta en cada release. Ver
[Publicar una versión](#publicar-una-versión) para configurar el registro.

---

## Instalación y consumo

### 1. Instalar

```bash
# Desde el registro (tras configurar el .npmrc, ver más abajo)
npm install @danielitouci96/design-system

# O desde un tarball local
npm install ../medical-platform/artifacts/medical-design-system-1.2.0.tgz
```

### 2. Importar el CSS (obligatorio, una sola vez)

En el punto de entrada de la app, **antes** de tus propios estilos:

```tsx
// src/main.tsx
import '@danielitouci96/design-system/styles.css'
import './styles/app.css'   // tus overrides: gana por orden de cascada
```

> **Por qué es obligatorio.** Desde `1.1.0` la hoja de estilos **no** se inyecta sola al importar un
> componente. Antes lo hacía, y eso filtraba una referencia a `.scss` en los tipos publicados que
> obligaba a cada consumidor a configurar `vite/client` solo para poder compilar. Importar el CSS
> explícitamente elimina ese problema y además hace **explícito el orden de cascada**, que es lo que
> determina si tus overrides ganan.

El orden importa: el CSS del DS debe entrar **antes** que el tuyo para que tus overrides
apliquen sobre los tokens del DS.

### 3. Usar los componentes

```tsx
import { Button, Card, CardContent, DataTable } from '@danielitouci96/design-system'

export function Ejemplo() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Guardar</Button>
      </CardContent>
    </Card>
  )
}
```

Importa siempre desde el paquete. Nunca desde rutas internas.

### 4. Tema de marca (opcional)

```tsx
import '@danielitouci96/design-system/themes/onco.css'   // azul
import '@danielitouci96/design-system/themes/cardio.css'  // violeta
```

Como plantilla para un tema propio:

```bash
cp node_modules/@danielitouci96/design-system/themes/tema-personalizado.css src/styles/mi-tema.css
```

### Instalar desde npm (no hace falta configurar nada)

El paquete se publica en **npmjs**, que es el registro por defecto. No hay `.npmrc`, ni token, ni
variables de entorno: es un paquete público.

```bash
npm install @danielitouci96/design-system
```

Y para probarlo sin instalar nada:

```bash
npx @danielitouci96/design-system@latest
```

> **Por qué el scope no es `@medical`.** El scope `@medical` está reservado en npm por una
> organización ajena a este proyecto, así que no se podía publicar ahí. El nombre en npmjs es
> **inmutable para siempre**, de modo que se eligió el scope del maintainer desde el principio. Si
> algún día se quisiera mover a una organización, habría que publicar con otro nombre.

### Configurar el registro (GitHub Packages, opcional)

Además de npmjs se puede publicar en **GitHub Packages** (`npm.pkg.github.com`), útil para tener una
copia atada al repositorio o para instalaciones internas sin salida a npmjs. Es un registro
**distinto**: un paquete publicado ahí **no** aparece en npmjs y viceversa. Para instalar desde ahí
hace falta lo siguiente.

**En la app que consume** — archivo `.npmrc` en la raíz. Esto **no es un secreto**, se commitea:

```ini
@danielitouci96:registry=https://npm.pkg.github.com
```

**Autenticación, siempre por variable de entorno** y nunca en un archivo del repo:

```bash
# Linux / servidor / CI
export NODE_AUTH_TOKEN="<tu personal access token de GitHub con read:packages>"
npm install @danielitouci96/design-system
```

```powershell
# Windows
$env:NODE_AUTH_TOKEN = "<tu personal access token de GitHub con read:packages>"
npm install @danielitouci96/design-system
```

**Permisos.** Cada persona del equipo pide su propio token
(*Settings → Developer settings → Personal access tokens → Tokens (classic)*). Para **instalar**
basta `read:packages`; para **publicar** hace falta `write:packages` y `repo`. Si un compañero recibe
un `403` o un `404` sin haber expirado el token, casi siempre es que su cuenta no tiene acceso al
paquete: hay que darle rol de lectura sobre el repositorio asociado al paquete.

**Visibilidad.** Los paquetes de GitHub heredan la visibilidad del repositorio: si el repo es
privado, el paquete es privado y necesita token para instalarse. Si el repo es público, el paquete se
puede instalar sin autenticación, pero **solo desde el registry de GitHub**.

**Certificados.** GitHub Packages usa un certificado público, así que no hace falta instalar ninguna
CA corporativa. En redes con proxy, si npm se queja, es un problema del proxy y no del registry.

### Dentro del monorepo

El path ya está resuelto en `tsconfig.base.json`:

```json
"paths": {
  "@danielitouci96/design-system": ["packages/design-system/src/index.ts"]
}
```

En este caso se sigue importando el CSS compilado igual:

```tsx
import { Button } from '@danielitouci96/design-system'
import '@danielitouci96/design-system/styles.css'
```

### Qué contiene el paquete

| Contenido | Ruta |
|---|---|
| JS compilado (ESM) | `dist/index.es.js` |
| Tipos compilados | `dist/index.d.ts` (+ 121 declaraciones por componente) |
| CSS compilado | `dist/design-system.css` |
| Temas de marca | `themes/*.css` |
| Documentación y licencia | `README.md`, `CHANGELOG.md`, `LICENSE` |

**No** se distribuye el código fuente: el paquete son los artefactos ya compilados.

### Fuentes

El DS define `--font-sans` (Geist) y `--font-serif` (Libre Caslon), pero **no** empaqueta las
fontfaces. Cada app debe instalarlas:

```bash
npm install @fontsource-variable/geist @fontsource/libre-caslon-text
```

```tsx
// src/main.tsx de la app
import '@fontsource-variable/geist'
import '@fontsource/libre-caslon-text'
import '@fontsource/libre-caslon-text/400.css'
import '@fontsource/libre-caslon-text/400-italic.css'
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
} from '@danielitouci96/design-system';

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
import '@danielitouci96/design-system';
import '@danielitouci96/design-system/themes/onco.css'; // o cardio.css / tu tema copiado
```

> **Cómo importarlo según tu app**
> - **Fuera del monorepo (paquete publicado):** el subpath `@danielitouci96/design-system/themes/...`
>   funciona gracias al campo `exports` del paquete. Nada que configurar.
> - **Dentro del monorepo con Vite (como la demo):** configura el alias
>   `@danielitouci96/design-system/themes → packages/design-system/themes/` (mira
>   `apps/design-system-demo/vite.config.ts`).
> - **Atajo sin aliases:** copia el archivo a tu app (`src/styles/tema.css`) e impórtalo
>   con una ruta relativa: `import './styles/tema.css';`

**Multi-marca**: abre el archivo de tema y cambia el selector de `:root` a
`:root[data-brand='miCliente']` (y su variante oscura con `[data-theme='dark']`).

Si publicas el paquete como dependencia, `themes/` viaja incluido en el artefacto
(campo `files` de `package.json` y export `@danielitouci96/design-system/themes/*`).

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
import { Icon } from '@danielitouci96/design-system';

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
- **Props y tipos:** JSDoc en el `.tsx` de cada componente, y los `.d.ts` ya vienen compilados
  en el paquete, así que el autocompletado funciona sin configurar nada.
- **Muestrario (referencia viva):** `apps/design-system-demo` → `npx nx run design-system-demo:dev`
  (http://localhost:4401). Es la referencia oficial: cada componente con sus variantes, la tabla de
  props y el snippet copiable.

> Storybook se eliminó en `1.1.0`: no lo consumía nadie y duplicaba el trabajo de documentación que
> ya cubre el Muestrario. El Muestrario es el único sitio de referencia.

---

## Versionado

El paquete sigue **SemVer**, con una regla propia para los cambios visuales, que en un design system
son tan contractuales como los de API.

| Versión | Cuándo |
|---|---|
| **patch** (`1.0.2` → `1.0.3`) | Correcciones que **no** cambian lo que se ve: fallos de render, de accesibilidad o de tipos. |
| **minor** (`1.0.3` → `1.1.0`) | Componentes, props o tokens nuevos. **Y también los cambios visuales deliberados**: mover un espaciado, un radio, un color, un tamaño de fuente. |
| **major** (`1.1.0` → `2.0.0`) | Se quita o renombra algo de la API, se cambia un valor por defecto del que una app dependía, o el cambio visual obliga a tocar código. |

La regla que lo resume:

> **Si al actualizar, una app se ve distinta sin haber tocado código, es como mínimo `minor`, y el
> CHANGELOG tiene que decir qué se movió.**

Esto importa especialmente aquí, porque las apps de tu equipo apilan sus propios overrides sobre los
tokens del DS. Cuando el DS cambia un valor, el resultado depende del orden de cascada. Por eso el
CHANGELOG se escribe siempre mirando la diff visual, no solo el código.

---

## Publicar una versión

### Para quien mantiene el paquete

```bash
# 1. Verificar que todo está verde
npx nx run @danielitouci96/design-system:test
npm run build:design-system

# 2. Subir la versión (actualiza package.json)
npm version patch     # o minor / major

# 3. Escribir el CHANGELOG y hacer commit de ambos
git add packages/design-system/package.json packages/design-system/CHANGELOG.md
git commit -m "release(ds): 1.0.3"

# 4. Crear el tarball (prepack compila automáticamente)
npm pack --pack-destination artifacts ./packages/design-system
```

Publicar en **npmjs**, que es el destino por defecto, requiere una cuenta en npmjs.org con **2FA
activado**. npm ya no admite publicar con contraseña: se usa un *automation token*.

```bash
# 1. En npmjs.com -> tu perfil -> Access Tokens -> Generate New Token
#    -> tipo "Automation", con el paquete y solo permiso "Read & Write"
# 2. El token va SIEMPRE en la variable de entorno, nunca en un archivo versionado
export NODE_AUTH_TOKEN="<token de automatización de npmjs>"

cd packages/design-system
npm publish
```

El `publishConfig` del paquete es `{ "access": "public" }` y **no** fija registry, a propósito: un
`npm publish` a secas va a npmjs y nace público, que es el destino principal. Fijar aquí el registry
de GitHub Packages sería una trampa, porque en un `npm publish` sin flags ganaría el `publishConfig` y
el paquete se iría al registry equivocado y con visibilidad equivocada.

**Publicar también en GitHub Packages** es opt-in, con `--registry` explícito:

```bash
npm publish --registry https://npm.pkg.github.com
```

> Comprobado que los flags mandan sobre `publishConfig`: `--registry` y `--access` lo pisan. Aun así
> es más seguro que el default sea lo correcto en vez de depender de acordarse de los flags.

> **La versión es inmutable.** Ni npmjs ni GitHub Packages permiten republicar una versión ya
> publicada; hay que subir la siguiente. Por eso conviene publicar solo cuando los tests están en
> verde. Y ojo: en npmjs el **nombre** tampoco se puede cambiar una vez publicado.

Publicar **no** es obligatorio: el tarball del paso 4 ya es consumible por cualquier app del equipo.
Es el plan B para redes sin salida a internet.

### Automatizarlo

El versionado manual es el punto de fricción. El siguiente paso natural es
**Changesets** (o `nx release`), que genera el CHANGELOG, decide la versión según el tipo de cambio
declarado en el PR y publica al hacer merge a `main`. Con eso, publicar una versión pasa de ser una
tarea manual a ser un efecto secundario del PR.

---

## Troubleshooting

**No tengo estilos / los componentes salen sin CSS**
Falta el import del CSS en el punto de entrada. Es obligatorio desde `1.1.0`:
`import '@danielitouci96/design-system/styles.css'`, y **antes** de tus propios estilos.

**`Cannot find module '@danielitouci96/design-system'` o tipos que no resuelven**
Si tu `package.json` apunta a una ruta `.tgz`, recuerda que hay que volver a instalar tras cada
release nuevo (el contenido cambia aunque la versión no). Con SemVer (`^1.2.0`) esto no pasa.

**`EINTEGRITY: integrity checksum failed`**
Solo con dependencia `file:` a un tarball. El `package-lock.json` guarda el hash `sha512` del `.tgz`,
así que si **reempaquetas la misma versión** (por ejemplo para corregir un `repository`), el lock
apunta a un hash que ya no existe y la instalación falla aunque el tarball sea válido. No es que esté
corrupto: es que la versión no cambió pero el contenido sí, y para npm eso es otra paquete.

Se arregla regenerando la entrada, sin tocar el resto del lockfile:

```bash
npm install @danielitouci96/design-system@file:../medical-platform/artifacts/medical-design-system-1.2.0.tgz
```

Es otra razón para no depender de tarballs: la primera versión publicada en el registry elimina el
problema de raíz, porque allí el contenido se sella en la versión y no se puede reempaquetar.

**`Invalid hook call`**
Hay dos copias de React. Comprueba que tu app **no** tenga `react` en sus `dependencies` de la
librería: el paquete lo declara solo como `peerDependency`, y por eso tu app debe aportar una única
versión de React.

**Los estilos de mi app pisan los del DS (o al revés)**
Es orden de cascada. El CSS del DS va primero; tus overrides después. Si necesitas que un token del
DS cambie de valor, sobrescribe el token en vez de escribir CSS contra las clases internas.

**`Error: Tooltip must be used within TooltipProvider`**
Corregido en `1.0.2`: `Tooltip` ya monta su propio provider. Si te aparece, estás en una versión
anterior; actualiza.

---

## Buenas prácticas

1. **Importa solo de `@danielitouci96/design-system`.** Nunca rutas internas (`src/components/...`).
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