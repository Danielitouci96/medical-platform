import * as React from 'react';
import {
  PageHeader,
  SectionHeader,
  ActionBar,
  Toolbar,
  DetailPanel,
  Page,
  PageContent,
  TwoColumnLayout,
  Sidebar,
  Navbar,
  NavbarLink,
  Box,
  Stack,
  Inline,
  Grid,
  Container,
  Text,
  Heading,
  Divider,
  Button,
  Tag,
  KeyValueList,
} from '@danielitouci96/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* PageHeader                                                          */
/* ------------------------------------------------------------------ */

const pageHeaderEntry: ShowcaseEntry = {
  id: 'page-header',
  name: 'PageHeader',
  category: 'Layout',
  description:
    'Cabecera de página: título, descripción, migas de pan y acciones. Da el mismo esqueleto a todas las pantallas de una app.',
  preview: (
    <Box style={{ border: '1px solid var(--color-divider)', borderRadius: 12, padding: 4 }}>
      <PageHeader
        title="Protocolo ONCO-01"
        description="14 participantes · 6 centros activos"
        breadcrumb={<Text size="sm" tone="tertiary">Protocolos / ONCO-01</Text>}
        actions={
          <Inline gap={2}>
            <Button size="sm" variant="outline">
              Archivar
            </Button>
            <Button size="sm" variant="primary">
              Editar
            </Button>
          </Inline>
        }
      />
    </Box>
  ),
  code: `import { PageHeader, Button } from '@danielitouci96/design-system';

<PageHeader
  title="Protocolo ONCO-01"
  description="14 participantes · 6 centros activos"
  breadcrumb={<Breadcrumb items={migas} />}
  actions={
    <Inline gap={2}>
      <Button variant="outline">Archivar</Button>
      <Button variant="primary">Editar</Button>
    </Inline>
  }
/>`,
  api: [
    { name: 'title', type: 'ReactNode', description: 'Obligatorio. Título de la página.' },
    { name: 'description', type: 'ReactNode', description: 'Subtítulo opcional.' },
    { name: 'actions', type: 'ReactNode', description: 'Acciones principales, a la derecha.' },
    { name: 'breadcrumb', type: 'ReactNode', description: 'Migas de pan sobre el título.' },
  ],
};

/* ------------------------------------------------------------------ */
/* SectionHeader                                                       */
/* ------------------------------------------------------------------ */

const sectionHeaderEntry: ShowcaseEntry = {
  id: 'section-header',
  name: 'SectionHeader',
  category: 'Layout',
  description:
    'Cabecera de una sección dentro de la página. Como PageHeader pero sin migas, para agrupar bloques.',
  preview: (
    <Box style={{ border: '1px solid var(--color-divider)', borderRadius: 12, padding: 4 }}>
      <SectionHeader
        title="Centros participantes"
        description="Ordenados por adherencia"
        actions={
          <Button size="sm" variant="ghost" iconRight="ArrowRight">
            Ver todos
          </Button>
        }
      />
    </Box>
  ),
  code: `import { SectionHeader, Button } from '@danielitouci96/design-system';

<SectionHeader
  title="Centros participantes"
  description="Ordenados por adherencia"
  actions={<Button size="sm" variant="ghost">Ver todos</Button>}
/>`,
  api: [
    { name: 'title', type: 'ReactNode', description: 'Obligatorio. Título de la sección.' },
    { name: 'description', type: 'ReactNode', description: 'Subtítulo opcional.' },
    { name: 'actions', type: 'ReactNode', description: 'Acción a la derecha.' },
  ],
};

/* ------------------------------------------------------------------ */
/* ActionBar / Toolbar                                                 */
/* ------------------------------------------------------------------ */

const barEntry: ShowcaseEntry = {
  id: 'action-bar',
  name: 'ActionBar / Toolbar',
  category: 'Layout',
  description:
    'Filas de acción sobre un listado o una tabla. Toolbar agrupa controles de filtrado; ActionBar, accionesMasivas de la selección.',
  preview: (
    <Stack gap={4}>
      <Toolbar>
        <Tag tone="info">6 seleccionados</Tag>
        <Text size="sm" tone="secondary">Ordenar por fecha</Text>
        <Box style={{ flex: 1 }} />
        <Button size="sm" variant="ghost" iconLeft="Filter">
          Filtros
        </Button>
      </Toolbar>
      <ActionBar>
        <Text size="sm" weight="medium">2 protocolos seleccionados</Text>
        <Inline gap={2}>
          <Button size="sm" variant="outline" iconLeft="Download">
            Exportar
          </Button>
          <Button size="sm" variant="danger" iconLeft="Trash2">
            Retirar
          </Button>
        </Inline>
      </ActionBar>
    </Stack>
  ),
  code: `import { Toolbar, ActionBar, Button } from '@danielitouci96/design-system';

<Toolbar>
  <Tag tone="info">6 seleccionados</Tag>
  <Button size="sm" variant="ghost">Filtros</Button>
</Toolbar>

<ActionBar>
  <Text weight="medium">2 protocolos seleccionados</Text>
  <Button size="sm" variant="danger" iconLeft="Trash2">Retirar</Button>
</ActionBar>`,
  api: [
    { name: 'children', type: 'ReactNode', description: 'Obligatorio. Contenido de la barra; usa un Box con flex para separar extremos.' },
  ],
};

/* ------------------------------------------------------------------ */
/* DetailPanel                                                         */
/* ------------------------------------------------------------------ */

const detailPanelEntry: ShowcaseEntry = {
  id: 'detail-panel',
  name: 'DetailPanel',
  category: 'Layout',
  description:
    'Panel de detalle con título, contenido y acciones. Lo que se ve al lado de un listado al seleccionar una fila.',
  preview: (
    <DetailPanel
      title="Hospital Central"
      actions={
        <Button size="sm" variant="ghost" iconLeft="Pencil">
          Editar
        </Button>
      }
    >
      <KeyValueList
        items={[
          { key: 'Investigador', value: 'Dra. Elena Vázquez' },
          { key: 'Adherencia', value: <Tag size="sm" tone="success">96%</Tag> },
          { key: 'Estado', value: 'Activo' },
        ]}
      />
    </DetailPanel>
  ),
  code: `import { DetailPanel, KeyValueList } from '@danielitouci96/design-system';

<DetailPanel title="Hospital Central" actions={<Button size="sm">Editar</Button>}>
  <KeyValueList items={datos} />
</DetailPanel>`,
  api: [
    { name: 'title', type: 'ReactNode', description: 'Cabecera del panel.' },
    { name: 'children', type: 'ReactNode', description: 'Obligatorio. Contenido.' },
    { name: 'actions', type: 'ReactNode', description: 'Acciones en la cabecera.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Primitivos de layout                                                */
/* ------------------------------------------------------------------ */

const layoutEntry: ShowcaseEntry = {
  id: 'layout-primitives',
  name: 'Box, Stack, Inline, Grid, Container',
  category: 'Layout',
  description:
    'Primitivos de composición. Stack apila en un eje, Inline distribuye en línea, Grid hace rejilla y Container limita el ancho. Box es la base: acepta las propiedades de flexbox como props.',
  preview: (
    <Stack gap={4}>
      <Box>
        <Text size="sm" weight="medium" as="div">
          Stack
        </Text>
        <Stack gap={2} padding={3} style={{ border: '1px dashed var(--color-divider)', borderRadius: 8 }}>
          <Box padding={2} style={{ background: 'var(--color-secondary-soft)', borderRadius: 6 }}>uno</Box>
          <Box padding={2} style={{ background: 'var(--color-secondary-soft)', borderRadius: 6 }}>dos</Box>
        </Stack>
      </Box>
      <Box>
        <Text size="sm" weight="medium" as="div">
          Inline
        </Text>
        <Inline gap={2} padding={3} style={{ border: '1px dashed var(--color-divider)', borderRadius: 8, width: '100%' }}>
          <Tag tone="info">a</Tag>
          <Tag tone="success">b</Tag>
          <Tag tone="warning">c</Tag>
        </Inline>
      </Box>
      <Box>
        <Text size="sm" weight="medium" as="div">
          Grid (3 columnas)
        </Text>
        <Grid columns={3} gap={2} style={{ padding: 12, border: '1px dashed var(--color-divider)', borderRadius: 8 }}>
          {['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'].map((t) => (
            <Box key={t} padding={2} style={{ background: 'var(--color-secondary-soft)', borderRadius: 6 }}>
              {t}
            </Box>
          ))}
        </Grid>
      </Box>
      <Box>
        <Text size="sm" weight="medium" as="div">
          Container size="md"
        </Text>
        <Container size="md" style={{ paddingBlock: 12 }}>
          <Box padding={2} style={{ background: 'var(--color-secondary-soft)', borderRadius: 6, textAlign: 'center' }}>
            ancho limitado
          </Box>
        </Container>
      </Box>
    </Stack>
  ),
  code: `import { Box, Stack, Inline, Grid, Container } from '@danielitouci96/design-system';

<Stack gap={4}>
  <Inline gap={2} wrap>
    <Tag tone="info">a</Tag>
    <Tag tone="success">b</Tag>
  </Inline>

  <Grid columns={3} gap={2}>
    {celdas}
  </Grid>

  <Container size="md">contenido</Container>
</Stack>`,
  api: [
    { name: 'Box', type: 'HTMLAttributes + flexbox', description: 'Base de todo: display, flexDirection, gap, padding, margin, width, position… como props.' },
    { name: 'Stack', type: '{ direction, gap, align, justify }', defaultValue: "direction 'column'", description: 'Un eje. direction admite responsive.' },
    { name: 'Inline', type: '{ gap, align, wrap }', description: 'Elementos en línea con salto opcional.' },
    { name: 'Grid', type: '{ columns, columnsAt, gap, alignItems, justifyItems }', description: 'Rejilla; columnsAt define los cortes responsive.' },
    { name: 'Container', type: '{ size, centered, paddingX }', description: "Ancho máximo: 'xs'…'xl', 'full'." },
  ],
  theming: 'Todo el layout se apoya en la escala de espaciado y en los tokens de superficie del tema; no hay colores fijos.',
};

/* ------------------------------------------------------------------ */
/* App shell                                                           */
/* ------------------------------------------------------------------ */

const SHELL_ITEMS = [
  { id: 'resumen', label: 'Resumen', icon: 'LayoutDashboard' as const },
  { id: 'protocolos', label: 'Protocolos', icon: 'ClipboardList' as const, badge: '14' },
  { id: 'unidades', label: 'Unidades', icon: 'Building2' as const },
  { id: 'informes', label: 'Informes', icon: 'BarChart3' as const },
];

/**
 * Réplica a escala del shell de Grove: rail a la izquierda sobre el canvas,
 * top bar esmerilada y contenido desplazándose por debajo. Es la única forma
 * de enseñar el cristal del Navbar, que sobre un fondo plano no se aprecia.
 */
function AppShellDemo() {
  const [activo, setActivo] = React.useState('protocolos');
  return (
    <Box
      className="ms-shell"
      style={{ border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}
    >
      <div className="ms-shell__body">
        <Sidebar
          items={SHELL_ITEMS}
          activeId={activo}
          onSelect={(i) => setActivo(i.id)}
          collapsible={false}
          header={
            <Inline gap={2} align="center">
              <span className="ms-shell__mark" aria-hidden="true">
                <span />
                <span />
              </span>
              <Text size="sm" weight="semibold">
                Grove AI
              </Text>
            </Inline>
          }
        />
        <div className="ms-shell__main">
          <Navbar
            brand={<Text size="sm">Unidad de Salud</Text>}
            actions={
              <Inline gap={2} align="center">
                <Tag size="sm" tone="success">
                  ONCO
                </Tag>
              </Inline>
            }
          >
            <NavbarLink href="#" active>
              Protocolos
            </NavbarLink>
            <NavbarLink href="#">Pacientes</NavbarLink>
            <NavbarLink href="#">Auditoría</NavbarLink>
          </Navbar>
          <div className="ms-shell__content">
            <PageHeader
              title="Protocolo ONCO-01"
              description="Adherencia de chemotherapy en el último trimestre."
            />
            <div className="ms-shell__rows">
              <div className="ms-shell__row" />
              <div className="ms-shell__row" />
              <div className="ms-shell__row" />
              <div className="ms-shell__row" />
              <div className="ms-shell__row" />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

const appShellEntry: ShowcaseEntry = {
  id: 'app-shell',
  name: 'App shell (Sidebar + Navbar)',
  category: 'Layout',
  description:
    'El chrome que envuelve el producto. El rail va sobre el canvas y marca el ítem activo en verde de marca; la barra superior es esmerilada, así el contenido sigue leyéndose al desplazar.',
  preview: () => <AppShellDemo />,
  code: `import { Sidebar, Navbar, NavbarLink, PageHeader } from '@danielitouci96/design-system';

<div className="shell">
  <Sidebar
    items={items}
    activeId={activo}
    onSelect={seleccionar}
    header={<Marca />}
  />
  <div className="shell__main">
    <Navbar brand={<Unidad />} actions={<Perfil />}>
      <NavbarLink active>Protocolos</NavbarLink>
      <NavbarLink>Pacientes</NavbarLink>
    </Navbar>
    <main className="shell__content">
      <PageHeader title="Protocolo ONCO-01" />
    </main>
  </div>
</div>`,
  api: [
    { name: 'Sidebar.items', type: '{ id, label, icon?, badge? }[]', description: 'Secciones del rail.' },
    { name: 'Sidebar.activeId / onSelect', type: 'string / (item) => void', description: 'Control del ítem activo.' },
    { name: 'Sidebar.collapsible', type: 'boolean', defaultValue: 'false', description: 'Permite plegar el rail a iconos.' },
    { name: 'Navbar.brand / children / actions', type: 'ReactNode', description: 'Marca, enlaces centrales y acciones de la derecha.' },
    { name: 'NavbarLink.active', type: 'boolean', defaultValue: 'false', description: 'Enlace actual; se pinta en verde de marca.' },
  ],
  theming:
    'Barra: --layout-shell-navbar-height / --layout-shell-navbar-padding-inline / --layout-shell-navbar-background / --layout-shell-navbar-blur. Rail: --layout-shell-sidebar-width y --layout-shell-nav-active-*.',
  floatingPreview: false,
};

/* ------------------------------------------------------------------ */
/* Layouts de página                                                   */
/* ------------------------------------------------------------------ */

const pageLayoutEntry: ShowcaseEntry = {
  id: 'page-layouts',
  name: 'Page, TwoColumnLayout, SidebarLayout',
  category: 'Layout',
  description:
    'Esquemas de página completos. TwoColumnLayout reparte en dos columnas con proporción; SidebarLayout ancla un panel lateral. Ambos son responsive por defecto.',
  preview: (
    <Stack gap={4}>
      <Box>
        <Text size="sm" weight="medium" as="div">
          Page + PageContent
        </Text>
        <Page padded maxWidth="lg">
          <PageContent>
            <Box padding={3} style={{ background: 'var(--color-secondary-soft)', borderRadius: 8 }}>
              Contenido de la página
            </Box>
          </PageContent>
        </Page>
      </Box>
      <Box>
        <Text size="sm" weight="medium" as="div">
          TwoColumnLayout ratio="1-2"
        </Text>
        <TwoColumnLayout
          ratio="1-2"
          left={
            <Box padding={3} style={{ background: 'var(--color-secondary-soft)', borderRadius: 8 }}>
              Izquierda
            </Box>
          }
          right={
            <Box padding={3} style={{ background: 'var(--color-surface-sunken)', borderRadius: 8 }}>
              Derecha (2 partes)
            </Box>
          }
        />
      </Box>
    </Stack>
  ),
  code: `import { Page, PageContent, TwoColumnLayout, SidebarLayout } from '@danielitouci96/design-system';

<Page padded maxWidth="lg">
  <PageHeader title="Protocolo ONCO-01" />
  <PageContent>
    <TwoColumnLayout
      ratio="1-2"
      left={<ListaProtocolos />}
      right={<DetalleProtocolo />}
    />
  </PageContent>
</Page>`,
  api: [
    { name: 'Page.padded', type: 'boolean', defaultValue: 'true', description: 'Añade el margen interior de la página.' },
    { name: 'Page.maxWidth', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'lg'", description: 'Ancho máximo del contenido.' },
    { name: 'TwoColumnLayout.ratio', type: "'1-2' | '1-3' | '1-1' | '2-3'", defaultValue: "'1-1'", description: 'Proporción entre izquierda y derecha.' },
    { name: 'SidebarLayout', type: '{ sidebar, children, sidebarWidth, responsive }', description: 'Panel lateral fijo junto al contenido.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Tipografía                                                          */
/* ------------------------------------------------------------------ */

const typographyEntry: ShowcaseEntry = {
  id: 'typography',
  name: 'Text, Heading, Divider',
  category: 'Layout',
  description:
    'Jerarquía de texto. Heading cubre los niveles de encabezado, Text el cuerpo, y Divider separa bloques con una etiqueta opcional.',
  preview: (
    <Stack gap={3}>
      <Heading as={2} size="xl">
        Titular de sección
      </Heading>
      <Heading as={3} size="md" tone="secondary">
        Subtítulo
      </Heading>
      <Text>Texto de cuerpo con el tamaño y tono por defecto.</Text>
      <Text size="sm" tone="secondary">
        Texto secundario para descripciones y notas.
      </Text>
      <Inline gap={3} wrap>
        <Text size="xs" tone="tertiary">
          2xs
        </Text>
        <Text size="xs">xs</Text>
        <Text size="sm">sm</Text>
        <Text size="base">base</Text>
        <Text size="lg">lg</Text>
      </Inline>
      <Inline gap={3} wrap>
        <Text weight="regular">regular</Text>
        <Text weight="medium">medium</Text>
        <Text weight="semibold">semibold</Text>
        <Text weight="bold">bold</Text>
      </Inline>
      <Divider label="o" />
      <Text size="sm" tone="success" weight="medium">
        Texto de éxito
      </Text>
    </Stack>
  ),
  code: `import { Text, Heading, Divider } from '@danielitouci96/design-system';

<Heading as={2} size="xl">Titular de sección</Heading>

<Text size="sm" tone="secondary">Descripción</Text>

<Text weight="medium" size="lg" tone="success">Texto de éxito</Text>

<Divider label="o" />`,
  api: [
    { name: 'Heading.as', type: '1 | 2 | 3 | 4 | 5 | 6', description: 'Nivel semántico; size solo cambia el tamaño visual.' },
    { name: 'Heading.size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'display'", defaultValue: "'md'", description: 'Escala del titular.' },
    { name: 'Text.tone', type: "'default' | 'secondary' | 'tertiary' | 'disabled' | 'inverse' | 'success' | 'warning' | 'danger' | 'info'", defaultValue: "'default'", description: 'Color semántico.' },
    { name: 'Text.size', type: "'2xs' | 'xs' | 'sm' | 'base' | 'lg'", defaultValue: "'base'", description: 'Escala del cuerpo.' },
    { name: 'Text.truncate', type: 'boolean', defaultValue: 'false', description: 'Recorta con puntos suspensivos en una línea.' },
    { name: 'Text.visuallyHidden', type: 'boolean', defaultValue: 'false', description: 'Solo para lectores de pantalla.' },
    { name: 'Divider.label', type: 'ReactNode', description: 'Etiqueta centrada, p. ej. «o».' },
  ],
  theming: 'Las tipografías vienen de --font-serif (display) y --font-sans (interfaz); los tonos, de la paleta del tema.',
};

export const LAYOUT: ShowcaseEntry[] = [
  appShellEntry,
  pageHeaderEntry,
  sectionHeaderEntry,
  barEntry,
  detailPanelEntry,
  layoutEntry,
  pageLayoutEntry,
  typographyEntry,
];
