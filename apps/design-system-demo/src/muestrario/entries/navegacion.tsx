import * as React from 'react';
import {
  Navbar,
  NavbarLink,
  Sidebar,
  Tabs,
  Stepper,
  Breadcrumb,
  FilterBar,
  SelectFilter,
  FilterChip,
  Avatar,
  Button,
  Tag,
  Inline,
  Stack,
  Box,
  Text,
} from '@medical/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

const navbarEntry: ShowcaseEntry = {
  id: 'navbar',
  name: 'Navbar',
  category: 'Navegación',
  description:
    'Barra superior de la aplicación: marca a la izquierda, enlaces al centro y acciones a la derecha (perfil, notificaciones).',
  preview: (
    <Navbar
      brand={
        <Inline gap={2} align="center">
          <MarcaPreview />
          <Text weight="semibold">Grove AI</Text>
        </Inline>
      }
      actions={
        <Inline gap={2} align="center">
          <Avatar fallback="EV" size="sm" tone="success" />
        </Inline>
      }
    >
      <NavbarLink href="#resumen">Resumen</NavbarLink>
      <NavbarLink href="#protocolos" active>
        Protocolos
      </NavbarLink>
      <NavbarLink href="#centros">Centros</NavbarLink>
      <NavbarLink href="#reportes" icon="BarChart3">
        Reportes
      </NavbarLink>
    </Navbar>
  ),
  code: `import { Navbar, NavbarLink, Avatar } from '@medical/design-system';

<Navbar
  brand={<Marca />}
  actions={<Avatar fallback="EV" size="sm" />}
>
  <NavbarLink href="/resumen">Resumen</NavbarLink>
  <NavbarLink href="/protocolos" active>Protocolos</NavbarLink>
  <NavbarLink href="/reportes" icon="BarChart3">Reportes</NavbarLink>
</Navbar>`,
  api: [
    { name: 'brand', type: 'ReactNode', description: 'Logo o nombre de la aplicación.' },
    { name: 'actions', type: 'ReactNode', description: 'Zona derecha: perfil, avisos, ajustes.' },
    { name: 'tone', type: "'default' | 'inverted'", defaultValue: "'default'", description: 'Esquema de color de la barra.' },
    { name: 'NavbarLink.active', type: 'boolean', defaultValue: 'false', description: 'Marca el enlace actual.' },
    { name: 'NavbarLink.icon', type: 'IconName', description: 'Icono opcional del enlace.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */

const SIDEBAR_ITEMS = [
  { id: 'resumen', label: 'Resumen', icon: 'LayoutDashboard' as const },
  { id: 'protocolos', label: 'Protocolos', icon: 'ClipboardList' as const, badge: '14' },
  { id: 'participantes', label: 'Participantes', icon: 'Users' as const },
  { id: 'centros', label: 'Centros', icon: 'Building2' as const },
  { id: 'reportes', label: 'Reportes', icon: 'BarChart3' as const, disabled: true },
];

function SidebarDemo() {
  const [activo, setActivo] = React.useState('protocolos');
  const [colapsado, setColapsado] = React.useState(false);
  return (
    <Box
      style={{
        maxWidth: 420,
        background: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Sidebar
        items={SIDEBAR_ITEMS}
        activeId={activo}
        onSelect={(i) => setActivo(i.id)}
        collapsible
        collapsed={colapsado}
        onCollapseChange={setColapsado}
        header={
          <Inline gap={2} align="center">
            <MarcaPreview />
            <Text size="sm" weight="semibold">
              Grove AI
            </Text>
          </Inline>
        }
      />
    </Box>
  );
}

const sidebarEntry: ShowcaseEntry = {
  id: 'sidebar',
  name: 'Sidebar',
  category: 'Navegación',
  description:
    'Menú lateral de la sección. Acepta items declarativos o children, y se puede colapsar a una barra de iconos.',
  preview: () => <SidebarDemo />,
  code: `import { Sidebar } from '@medical/design-system';

<Sidebar
  items={[
    { id: 'resumen', label: 'Resumen', icon: 'LayoutDashboard' },
    { id: 'protocolos', label: 'Protocolos', icon: 'ClipboardList', badge: '14' },
  ]}
  activeId={activo}
  onSelect={(item) => setActivo(item.id)}
  collapsible
/>`,
  api: [
    { name: 'items', type: 'SidebarItemDef[]', description: 'Menú declarativo: id, label, icon, badge, disabled, href.' },
    { name: 'activeId / onSelect', type: 'string / (item) => void', description: 'Elemento activo y cambio de sección.' },
    { name: 'collapsible / collapsed', type: 'boolean', description: 'Permite y controla el colapso a iconos.' },
    { name: 'header / footer', type: 'ReactNode', description: 'Zonas fijas arriba y abajo del menú.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

const TABS = [
  { value: 'resumen', label: 'Resumen' },
  { value: 'detalle', label: 'Detalle', badge: '6' },
  { value: 'actividad', label: 'Actividad', icon: 'Activity' as const },
  { value: 'archivos', label: 'Archivos', disabled: true },
];

function TabsDemo() {
  const [valor, setValor] = React.useState('resumen');
  return (
    <Stack gap={3}>
      <Tabs
        tabs={TABS}
        value={valor}
        onValueChange={setValor}
        variant="underline"
        orientation="horizontal"
      />
      <Box className="ms-demo-note">
        Contenido de <strong>{valor}</strong>
      </Box>
    </Stack>
  );
}

const tabsEntry: ShowcaseEntry = {
  id: 'tabs',
  name: 'Tabs',
  category: 'Navegación',
  description:
    'Cambia entre paneles hermanos dentro de la misma vista. El contenido puede venir en tab.content o renderizarlo la app.',
  preview: () => <TabsDemo />,
  code: `import { Tabs } from '@medical/design-system';

<Tabs
  tabs={[
    { value: 'resumen', label: 'Resumen' },
    { value: 'detalle', label: 'Detalle', badge: '6' },
  ]}
  value={valor}
  onValueChange={setValor}
  variant="underline"
/>`,
  api: [
    { name: 'tabs', type: 'TabDef[]', description: 'value, label, icon, badge, disabled, content.' },
    { name: 'value / onValueChange', type: 'string / (value: string) => void', description: 'Pestaña activa.' },
    { name: 'variant', type: "'underline' | 'pills' | 'enclosed'", defaultValue: "'underline'", description: 'Estilo visual.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Disposición.' },
    { name: 'loop', type: 'boolean', defaultValue: 'false', description: 'La flecha derecha al final vuelve al inicio.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Stepper                                                             */
/* ------------------------------------------------------------------ */

const STEPS = [
  { id: 'datos', label: 'Datos', description: 'Información básica' },
  { id: 'criterios', label: 'Criterios', description: 'Inclusión y exclusión' },
  { id: 'revision', label: 'Revisión', description: 'Validación interna' },
  { id: 'publicacion', label: 'Publicación' },
];

function StepperDemo() {
  const [paso, setPaso] = React.useState(1);
  return (
    <Stack gap={4}>
      <Stepper
        steps={STEPS}
        activeStep={paso}
        onStepClick={(_, i) => setPaso(i)}
        allowStepChange
        showIcons
        orientation="horizontal"
      />
      <Inline gap={2} wrap>
        <Button size="sm" variant="outline" disabled={paso === 0} onClick={() => setPaso((p) => p - 1)}>
          Anterior
        </Button>
        <Button size="sm" variant="primary" disabled={paso === STEPS.length - 1} onClick={() => setPaso((p) => p + 1)}>
          Siguiente
        </Button>
      </Inline>
    </Stack>
  );
}

const stepperEntry: ShowcaseEntry = {
  id: 'stepper',
  name: 'Stepper',
  category: 'Navegación',
  description:
    'Indica en qué paso de un flujo está el usuario. Muestra el avance completo, no solo el paso actual.',
  preview: () => <StepperDemo />,
  code: `import { Stepper } from '@medical/design-system';

<Stepper
  steps={[
    { id: 'datos', label: 'Datos' },
    { id: 'criterios', label: 'Criterios' },
    { id: 'revision', label: 'Revisión' },
  ]}
  activeStep={paso}
  onStepClick={irAPaso}
  allowStepChange
/>`,
  api: [
    { name: 'steps', type: 'StepperStep[]', description: 'id, label, description, icon.' },
    { name: 'activeStep', type: 'number', description: 'Índice del paso actual.' },
    { name: 'onStepClick', type: '(step, index) => void', description: 'Salto a otro paso.' },
    { name: 'allowStepChange', type: 'boolean', defaultValue: 'false', description: 'Permite saltar a pasos aún no completados.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Disposición.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Breadcrumb                                                          */
/* ------------------------------------------------------------------ */

const breadcrumbEntry: ShowcaseEntry = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'Navegación',
  description:
    'Ruta de migas: dónde estás dentro de la jerarquía. El último elemento es la página actual y no lleva enlace.',
  preview: (
    <Breadcrumb
      items={[
        { label: 'Inicio', href: '#inicio', icon: 'Home' },
        { label: 'Protocolos', href: '#protocolos' },
        { label: 'ONCO-01', href: '#onco01' },
        { label: 'Detalle' },
      ]}
    />
  ),
  code: `import { Breadcrumb } from '@medical/design-system';

<Breadcrumb
  items={[
    { label: 'Inicio', href: '/', icon: 'Home' },
    { label: 'Protocolos', href: '/protocolos' },
    { label: 'Detalle' },
  ]}
/>`,
  api: [
    { name: 'items', type: 'BreadcrumbItem[]', description: 'label, href, icon. El último va sin href.' },
    { name: 'separator', type: 'IconName', description: 'Icono que separa los niveles.' },
  ],
};

/* ------------------------------------------------------------------ */
/* FilterBar                                                           */
/* ------------------------------------------------------------------ */

function FilterBarDemo() {
  const [busqueda, setBusqueda] = React.useState('');
  const [fase, setFase] = React.useState('todas');
  const [sello, setSello] = React.useState(true);

  return (
    <Stack gap={3}>
      <FilterBar
        searchValue={busqueda}
        onSearchChange={setBusqueda}
        searchPlaceholder="Buscar protocolos…"
        showSearch
        showFilterButton
        activeFilterCount={sello ? 1 : 0}
        onFilterButtonClick={() => undefined}
        quickSelects={
          <SelectFilter
            label="Fase"
            value={fase}
            onChange={(v) => setFase(v ?? 'todas')}
            options={[
              { value: 'todas', label: 'Todas' },
              { value: 'diseno', label: 'Diseño' },
              { value: 'recruit', label: 'Recruitment' },
            ]}
            clearable
          />
        }
      >
        {sello ? (
          <FilterChip
            id="sello"
            label="Sello"
            value="Con sello"
            onRemove={(id) => setSello(id !== 'sello')}
          />
        ) : null}
      </FilterBar>
      <Inline gap={2} wrap>
        <Tag tone="info">{busqueda ? `Búsqueda: ${busqueda}` : 'Sin búsqueda'}</Tag>
        <Tag tone="neutral">Fase: {fase}</Tag>
        <Tag tone={sello ? 'success' : 'danger'}>{sello ? 'Sello aplicado' : 'Sin sello'}</Tag>
      </Inline>
    </Stack>
  );
}

const filterBarEntry: ShowcaseEntry = {
  id: 'filter-bar',
  name: 'FilterBar',
  category: 'Navegación',
  description:
    'Barra de filtros para listados. Compón búsqueda, filtros rápidos, chips activos y el botón que abre el panel avanzado.',
  preview: () => <FilterBarDemo />,
  code: `import { FilterBar, FilterChip, SelectFilter } from '@medical/design-system';

<FilterBar
  searchValue={busqueda}
  onSearchChange={setBusqueda}
  searchPlaceholder="Buscar protocolos…"
  showFilterButton
  activeFilterCount={2}
  onFilterButtonClick={abrirPanel}
  quickSelects={
    <SelectFilter
      label="Fase"
      value={fase}
      onChange={setFase}
      options={fases}
      clearable
    />
  }
>
  <FilterChip id="sello" label="Sello" value="Con sello" onRemove={quitarSello} />
</FilterBar>`,
  api: [
    { name: 'searchValue / onSearchChange', type: 'string / (v: string) => void', description: 'Búsqueda de la barra.' },
    { name: 'showFilterButton', type: 'boolean', defaultValue: 'false', description: 'Muestra el botón de filtros avanzados.' },
    { name: 'activeFilterCount', type: 'number', description: 'Contador del botón; ponlo junto a showFilterButton.' },
    { name: 'quickSelects', type: 'ReactNode', description: 'SelectFilter, DateFilter o controles rápidos en línea.' },
    { name: 'children', type: 'ReactNode', description: 'FilterChip o ActiveFilters con los filtros aplicados.' },
    { name: 'SelectFilter.onChange', type: '(value: string | undefined) => void', description: 'Devuelve undefined al limpiar.' },
    { name: 'FilterChip', type: '{ id, label, value, onRemove }', description: 'onRemove recibe el id del chip.' },
  ],
};

/* Marca del preview del Navbar. */
function MarcaPreview() {
  return (
    <Box
      style={{
        width: 28,
        height: 28,
        borderRadius: 9999,
        background: 'var(--color-secondary)',
        color: 'var(--color-on-secondary)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 13,
      }}
    >
      G
    </Box>
  );
}

export const NAVEGACION: ShowcaseEntry[] = [
  navbarEntry,
  sidebarEntry,
  tabsEntry,
  stepperEntry,
  breadcrumbEntry,
  filterBarEntry,
];
