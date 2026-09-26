import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as DS from './index'

// ============================================================================
// PUBLIC API CONTRACT
// ============================================================================
// This is the single most valuable test in the library. A design system is
// consumed by name, so deleting or renaming an export is a breaking change
// that no type error will catch until a consumer's build fails. This test
// fails the moment the public surface changes, forcing a conscious decision
// and a CHANGELOG entry.
// ============================================================================

const PUBLIC_API = [
  // Foundations
  'Icon',
  // Primitives
  'Box', 'Stack', 'Grid', 'Inline', 'Container',
  // Components
  'Alert', 'Avatar', 'Badge', 'Breadcrumb', 'Button', 'ButtonGroup', 'Calendar',
  'Checkbox', 'Chip', 'Combobox', 'DataTable', 'DatePicker', 'DateRangePicker',
  'DateTimePicker', 'Divider', 'Drawer', 'FormField', 'Heading', 'IconButton',
  'Input', 'Label', 'Link', 'Modal', 'MultiSelect', 'Navbar', 'NumberInput',
  'Pagination', 'PasswordInput', 'Popover', 'Progress', 'RadioGroup',
  'SearchInput', 'Select', 'SelectItem', 'Sidebar', 'Skeleton', 'Slider',
  'Spinner', 'StatusIndicator', 'Stepper', 'Switch', 'Tabs', 'Tag', 'Text',
  'Textarea', 'TimePicker',
  // Overlays
  'ConfirmDialog', 'Toast', 'ToastProvider', 'ToastViewport', 'Tooltip',
  'TooltipProvider',
  // Menus
  'DropdownMenu', 'DropdownMenuCheckboxItem', 'DropdownMenuItem',
  'DropdownMenuItemShortcut', 'DropdownMenuLabel', 'DropdownMenuSeparator',
  // Surfaces
  'Card', 'CardContent', 'CardDescription', 'CardFooter', 'CardHeader',
  'CardTitle', 'Table', 'TableBody', 'TableCell', 'TableHead', 'TableHeader',
  'TableRow',
  // Patterns
  'FilterBar', 'FilterButton', 'FilterChip', 'ActiveFilters', 'SearchFilter',
  'SelectFilter', 'MultiSelectFilter', 'DateFilter', 'DateRangeFilter',
  'NumberRangeFilter', 'NavbarLink', 'PageHeader', 'SectionHeader', 'SearchBar',
  'ActionBar', 'Toolbar', 'KeyValueList', 'DetailPanel',
  // Layouts
  'Page', 'PageContent', 'TwoColumnLayout', 'ThreeColumnLayout', 'SidebarLayout',
] as const

describe('public API contract', () => {
  it('exports every documented component', () => {
    const missing = PUBLIC_API.filter((name) => !(name in DS))
    expect(missing, `missing exports: ${missing.join(', ')}`).toEqual([])
  })

  it('exports nothing beyond the documented contract', () => {
    const extra = Object.keys(DS).filter((name) => !PUBLIC_API.includes(name as never))
    expect(
      extra,
      `undeclared exports: ${extra.join(', ')}. Add them to PUBLIC_API or stop exporting them.`,
    ).toEqual([])
  })

  it('exports components as renderable values', () => {
    // Components are a mix of plain functions and React.forwardRef objects,
    // so "is a function" is the wrong assertion. What matters is that each
    // export is something React can actually mount.
    const isRenderable = (value: unknown) =>
      typeof value === 'function' ||
      (typeof value === 'object' && value !== null && '$$typeof' in value)

    const notRenderable = PUBLIC_API.filter((name) => !isRenderable(DS[name]))
    expect(notRenderable, `not renderable: ${notRenderable.join(', ')}`).toEqual([])
  })
})

// ============================================================================
// RENDER SMOKE
// ============================================================================
// Mounts every component and fails on any console error or thrown exception.
// This is the test that would have caught the three real regressions shipped
// in 1.0.1 / 1.0.2:
//   - Tooltip throwing "must be used within TooltipProvider"
//   - Drawer/Modal rendering invalid `border` values
//   - components missing their style imports (MultiSelect, Combobox, Label,
//     the date pickers)
// ============================================================================

/** Asserts a subtree mounts without throwing and without logging to the console. */
function expectCleanRender(name: string, mount: () => void) {
  const logged: string[] = []
  vi.spyOn(console, 'error').mockImplementation((...a) => logged.push(a.map(String).join(' ')))
  vi.spyOn(console, 'warn').mockImplementation((...a) => logged.push(a.map(String).join(' ')))

  expect(mount, `${name} threw while mounting`).not.toThrow()
  expect(logged, `${name} logged to the console:\n${logged.join('\n')}`).toEqual([])
}

type ComponentName = keyof typeof DS

interface StandaloneCase {
  name: ComponentName
  props?: Record<string, unknown>
  children?: React.ReactNode
}

const STANDALONE: StandaloneCase[] = [
  // --- Primitives ---------------------------------------------------------
  { name: 'Box', children: 'Box' },
  { name: 'Stack', children: 'Stack' },
  { name: 'Grid', children: 'Grid' },
  { name: 'Inline', children: 'Inline' },
  { name: 'Container', children: 'Container' },
  { name: 'Icon', props: { icon: () => <svg data-testid="icon" /> } },

  // --- Components ---------------------------------------------------------
  { name: 'Alert', props: { variant: 'info' }, children: 'Alerta' },
  { name: 'Avatar', props: { name: 'Ada Lovelace' } },
  { name: 'Badge', children: 'Nuevo' },
  { name: 'Breadcrumb', props: { items: [{ label: 'Inicio', href: '#' }] } },
  { name: 'Button', children: 'Guardar' },
  { name: 'ButtonGroup', children: 'Grupo' },
  { name: 'Calendar' },
  { name: 'Checkbox', props: { label: 'Activo' } },
  { name: 'Chip', children: 'Chip' },
  { name: 'Combobox', props: { options: [{ label: 'Uno', value: '1' }], placeholder: 'Buscar' } },
  {
    name: 'DataTable',
    props: {
      columns: [{ id: 'name', accessorKey: 'name', header: 'Nombre' }],
      data: [{ name: 'Paciente' }],
      getRowId: (row: { name: string }) => row.name,
    },
  },
  { name: 'DatePicker', props: { label: 'Fecha' } },
  { name: 'DateRangePicker', props: { label: 'Rango' } },
  { name: 'DateTimePicker', props: { label: 'Fecha y hora' } },
  { name: 'Divider' },
  { name: 'Drawer', props: { open: true, onOpenChange: () => {}, title: 'Drawer' } },
  { name: 'FormField', props: { label: 'Campo' }, children: 'Contenido' },
  { name: 'Heading', children: 'Titulo' },
  { name: 'IconButton', props: { label: 'Cerrar' }, children: 'X' },
  { name: 'Input', props: { label: 'Input' } },
  { name: 'Label', props: { htmlFor: 'campo' }, children: 'Etiqueta' },
  { name: 'Link', props: { href: '#' }, children: 'Enlace' },
  { name: 'Modal', props: { open: true, onOpenChange: () => {}, title: 'Modal' } },
  { name: 'MultiSelect', props: { options: [{ label: 'Uno', value: '1' }], placeholder: 'Seleccionar' } },
  { name: 'Navbar', children: 'Navbar' },
  { name: 'NavbarLink', props: { href: '#' }, children: 'Inicio' },
  { name: 'NumberInput', props: { label: 'Cantidad' } },
  { name: 'Pagination', props: { page: 1, pageCount: 3, onPageChange: () => {} } },
  { name: 'PasswordInput', props: { label: 'Password' } },
  { name: 'Popover', props: { trigger: <button>Abrir</button>, title: 'Popover' }, children: 'Contenido' },
  { name: 'Progress', props: { value: 40 } },
  { name: 'RadioGroup', props: { label: 'Grupo', items: [{ value: '1', label: 'Uno' }], defaultValue: '1' } },
  { name: 'SearchInput', props: { label: 'Buscar' } },
  { name: 'Select', props: { value: '1' }, children: <option value="1">Uno</option> },
  { name: 'Sidebar', children: 'Sidebar' },
  { name: 'Skeleton' },
  { name: 'Slider', props: { value: [30], onValueChange: () => {} } },
  { name: 'Spinner' },
  { name: 'StatusIndicator', props: { label: 'Activo' } },
  { name: 'Stepper', props: { steps: [{ id: '1', label: 'Uno' }, { id: '2', label: 'Dos' }], activeStep: 0 } },
  { name: 'Switch', props: { label: 'Interruptor' } },
  { name: 'Tabs', props: { tabs: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] } },
  { name: 'Tag', children: 'Etiqueta' },
  { name: 'Text', children: 'Texto' },
  { name: 'Textarea', props: { label: 'Notas' } },
  { name: 'TimePicker', props: { label: 'Hora' } },
  { name: 'Tooltip', props: { content: 'Ayuda' }, children: <button>Info</button> },
  { name: 'TooltipProvider', children: 'Provider' },
  { name: 'ConfirmDialog', props: { open: true, onOpenChange: () => {}, title: 'Confirmar' } },

  // --- Surfaces -----------------------------------------------------------
  { name: 'Card', children: 'Card' },
  { name: 'CardHeader', children: 'Header' },
  { name: 'CardTitle', children: 'Titulo' },
  { name: 'CardDescription', children: 'Descripcion' },
  { name: 'CardContent', children: 'Contenido' },
  { name: 'CardFooter', children: 'Footer' },

  // --- Patterns -----------------------------------------------------------
  { name: 'PageHeader', props: { title: 'Pacientes' } },
  { name: 'SectionHeader', props: { title: 'Seccion' } },
  { name: 'SearchBar', props: { value: '', onSearchChange: () => {} } },
  { name: 'ActionBar', children: 'Acciones' },
  { name: 'Toolbar', children: 'Herramientas' },
  { name: 'KeyValueList', props: { items: [{ label: 'Edad', value: '30' }] } },
  { name: 'DetailPanel', props: { title: 'Detalle' }, children: 'Cuerpo' },
  { name: 'FilterBar', props: { onSearchChange: () => {} } },
  { name: 'FilterButton', props: { count: 2 } },
  { name: 'FilterChip', props: { id: '1', label: 'Estado', value: 'Activo', onRemove: () => {} } },
  { name: 'ActiveFilters', props: { activeCount: 1, onClearAll: () => {} } },
  { name: 'SearchFilter', props: { value: '', onChange: () => {} } },
  { name: 'SelectFilter', props: { onChange: () => {}, options: [{ label: 'Uno', value: '1' }] } },
  {
    name: 'MultiSelectFilter',
    props: { value: [], onChange: () => {}, options: [{ label: 'Uno', value: '1' }] },
  },
  { name: 'DateFilter', props: { onChange: () => {} } },
  { name: 'DateRangeFilter', props: { onChange: () => {} } },
  { name: 'NumberRangeFilter', props: { onChange: () => {} } },

  // --- Layouts ------------------------------------------------------------
  { name: 'Page', children: 'Pagina' },
  { name: 'PageContent', children: 'Contenido' },
  { name: 'TwoColumnLayout', props: { left: 'L', right: 'R' } },
  { name: 'ThreeColumnLayout', props: { center: 'C' } },
  { name: 'SidebarLayout', props: { sidebar: 'S' }, children: 'Main' },
]

/**
 * Components that only work inside a provider or parent, so they cannot be
 * mounted standalone. They are exercised as a realistic composition instead.
 */
const COMPOSITE: Array<{ name: string; mount: () => void }> = [
  {
    // Table sections are only valid inside a <table>; mounted standalone they
    // would trigger React validateDOMNesting warnings that say nothing about
    // this library.
    name: 'Table + TableHeader/Body/Row/Head/Cell',
    mount: () =>
      render(
        <DS.Table>
          <DS.TableHeader>
            <DS.TableRow>
              <DS.TableHead>Nombre</DS.TableHead>
            </DS.TableRow>
          </DS.TableHeader>
          <DS.TableBody>
            <DS.TableRow>
              <DS.TableCell>Paciente</DS.TableCell>
            </DS.TableRow>
          </DS.TableBody>
        </DS.Table>,
      ),
  },
  {
    name: 'Select + SelectItem',
    mount: () =>
      render(
        <DS.Select value="1" onValueChange={() => {}}>
          <DS.SelectItem value="1">Uno</DS.SelectItem>
        </DS.Select>,
      ),
  },
  {
    name: 'ToastProvider + Toast + ToastViewport',
    mount: () =>
      render(
        <DS.ToastProvider>
          <DS.Toast title="Guardado" description="Los cambios se aplicaron" />
          <DS.ToastViewport />
        </DS.ToastProvider>,
      ),
  },
  {
    name: 'DropdownMenu + items',
    mount: () =>
      render(
        <DS.DropdownMenu trigger={<button>Menu</button>}>
          <DS.DropdownMenuLabel>Acciones</DS.DropdownMenuLabel>
          <DS.DropdownMenuItem>Editar</DS.DropdownMenuItem>
          <DS.DropdownMenuItemShortcut>Ctrl+E</DS.DropdownMenuItemShortcut>
          <DS.DropdownMenuCheckboxItem>Activo</DS.DropdownMenuCheckboxItem>
          <DS.DropdownMenuSeparator />
        </DS.DropdownMenu>,
      ),
  },
]

const RENDER_CASES: Array<{ name: string; mount: () => void }> = [
  ...STANDALONE.map((c) => ({
    name: c.name as string,
    mount: () => {
      const Component = DS[c.name] as React.ComponentType<Record<string, unknown>>
      render(<Component {...(c.props ?? {})}>{c.children}</Component>)
    },
  })),
  ...COMPOSITE,
]

describe('render smoke', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it.each(RENDER_CASES)('mounts $name cleanly', ({ name, mount }) => {
    expectCleanRender(name, mount)
  })
})
