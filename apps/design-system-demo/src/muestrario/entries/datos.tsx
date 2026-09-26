import * as React from 'react';
import {
  Tag,
  Chip,
  Badge,
  Avatar,
  StatusIndicator,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  DataTable,
  Pagination,
  KeyValueList,
  Button,
  Inline,
  Stack,
  Text,
} from '@medical/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* Tag                                                                 */
/* ------------------------------------------------------------------ */

const tagEntry: ShowcaseEntry = {
  id: 'tag',
  name: 'Tag',
  category: 'Datos',
  description:
    'Etiqueta compacta para metadatos, estados o filtros. El tono comunica intención (éxito, advertencia, peligro) sin ocupar el espacio de un botón.',
  preview: (
    <Inline gap={3} wrap>
      <Tag tone="neutral">ECOG 1</Tag>
      <Tag tone="info">Admisión</Tag>
      <Tag tone="success" icon="Check">
        Adherencia 96%
      </Tag>
      <Tag tone="warning">Revisar</Tag>
      <Tag tone="danger">Crítico</Tag>
      <Tag size="sm" tone="success">
        Compacto
      </Tag>
      <Tag removable onRemove={() => undefined}>
        Quitable
      </Tag>
    </Inline>
  ),
  code: `import { Tag } from '@medical/design-system';

<Tag tone="success" icon="Check">Adherencia 96%</Tag>

<Tag tone="warning">Revisar</Tag>

<Tag size="sm" tone="info">ECOG 1</Tag>

<Tag removable onRemove={() => quitar(id)}>Filtro</Tag>`,
  api: [
    { name: 'tone', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'", defaultValue: "'neutral'", description: 'Intención semántica de la etiqueta.' },
    { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Tamaño de la etiqueta.' },
    { name: 'icon', type: 'IconName', description: 'Icono opcional a la izquierda.' },
    { name: 'removable', type: 'boolean', defaultValue: 'false', description: 'Muestra el botón de quitar.' },
    { name: 'onRemove', type: '() => void', description: 'Callback al pulsar quitar.' },
    { name: 'removeLabel', type: 'string', defaultValue: "'Remove'", description: 'Etiqueta accesible del botón de quitar.' },
  ],
  theming: 'Cada tono se apoya en los pares de tokens de estado (--color-success-*, --color-warning-*, etc.) del tema activo.',
};

/* ------------------------------------------------------------------ */
/* Chip                                                                */
/* ------------------------------------------------------------------ */

const chipEntry: ShowcaseEntry = {
  id: 'chip',
  name: 'Chip',
  category: 'Datos',
  description:
    'Elemento seleccionable. A diferencia de Tag, el Chip participa en una selección: úsalo para filtros y opciones con estado activo.',
  preview: (
    <Stack gap={3}>
      <Inline gap={2} wrap>
        <Chip selected>Todos</Chip>
        <Chip>En revisión</Chip>
        <Chip>Finalizados</Chip>
        <Chip disabled>Borrados</Chip>
      </Inline>
      <Inline gap={2} wrap>
        <Chip variant="filter" selected icon="Filter">
          Con filtro
        </Chip>
        <Chip variant="outline" size="sm" icon="Tag">
          Etiqueta
        </Chip>
      </Inline>
    </Stack>
  ),
  code: `import { Chip } from '@medical/design-system';

<Chip selected>Todos</Chip>
<Chip>En revisión</Chip>
<Chip variant="filter" selected icon="Filter">Con filtro</Chip>`,
  api: [
    { name: 'selected', type: 'boolean', defaultValue: 'false', description: 'Estado activo del chip.' },
    { name: 'variant', type: "'default' | 'outline' | 'filter'", defaultValue: "'default'", description: "'filter' es para filtros aplicados." },
    { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Tamaño del chip.' },
    { name: 'icon', type: 'IconName', description: 'Icono opcional.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */

const badgeEntry: ShowcaseEntry = {
  id: 'badge',
  name: 'Badge',
  category: 'Datos',
  description:
    'Contador o marca breve para adjuntar a un icono o enlace. No lleva texto largo: es una señal, no un mensaje.',
  preview: (
    <Inline gap={5} wrap>
      <Badge>3</Badge>
      <Badge tone="info">12</Badge>
      <Badge tone="success">OK</Badge>
      <Badge tone="warning">9+</Badge>
      <Badge tone="danger">!</Badge>
      <Badge variant="solid" size="sm" dot />
      <Badge variant="outline" tone="info" icon="Check">
        Sync
      </Badge>
    </Inline>
  ),
  code: `import { Badge } from '@medical/design-system';

<Badge tone="danger">!</Badge>
<Badge variant="solid" size="sm" dot />
<Badge variant="outline" tone="info" icon="Check">Sync</Badge>`,
  api: [
    { name: 'tone', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'", defaultValue: "'neutral'", description: 'Color del badge.' },
    { name: 'variant', type: "'soft' | 'solid' | 'outline'", defaultValue: "'soft'", description: 'Peso visual.' },
    { name: 'size', type: "'xs' | 'sm' | 'md'", defaultValue: "'md'", description: 'Tamaño.' },
    { name: 'dot', type: 'boolean', defaultValue: 'false', description: 'Punto en lugar de contenido (estado no numérico).' },
    { name: 'icon', type: 'IconName', description: 'Icono en lugar de texto.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Avatar                                                              */
/* ------------------------------------------------------------------ */

const avatarEntry: ShowcaseEntry = {
  id: 'avatar',
  name: 'Avatar',
  category: 'Datos',
  description:
    'Identifica a una persona. Si no hay imagen, fallback muestra iniciales, así que nunca queda un círculo vacío.',
  preview: (
    <Inline gap={4} wrap align="center">
      <Avatar src="https://i.pravatar.cc/80?img=12" alt="Dra. Elena Vázquez" size="sm" />
      <Avatar fallback="EV" tone="success" />
      <Avatar fallback="JP" size="lg" tone="warning" />
      <Avatar fallback="ML" size="xl" tone="danger" />
      <Avatar fallback="?" tone="secondary" size="sm" />
    </Inline>
  ),
  code: `import { Avatar } from '@medical/design-system';

<Avatar src="/pacientes/evazquez.jpg" alt="Dra. Elena Vázquez" size="sm" />

<Avatar fallback="EV" tone="success" />`,
  api: [
    { name: 'src / alt', type: 'string', description: 'Foto y su texto alternativo.' },
    { name: 'fallback', type: 'string', description: 'Iniciales o icono cuando no hay foto.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Diámetro.' },
    { name: 'tone', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'", defaultValue: "'primary'", description: 'Color del fallback.' },
  ],
};

/* ------------------------------------------------------------------ */
/* StatusIndicator                                                     */
/* ------------------------------------------------------------------ */

const statusEntry: ShowcaseEntry = {
  id: 'status-indicator',
  name: 'StatusIndicator',
  category: 'Datos',
  description:
    'Estado con punto de color y, opcionalmente, un pulso animado para "en vivo". Para el estado de un servicio o un proceso.',
  preview: (
    <Stack gap={3}>
      <Inline gap={4} wrap>
        <StatusIndicator tone="success" label="Operativo" />
        <StatusIndicator tone="warning" label="Degradado" />
        <StatusIndicator tone="danger" label="Caído" />
        <StatusIndicator tone="info" label="Sincronizando" pulse />
        <StatusIndicator tone="neutral" />
      </Inline>
    </Stack>
  ),
  code: `import { StatusIndicator } from '@medical/design-system';

<StatusIndicator tone="success" label="Operativo" />
<StatusIndicator tone="info" label="Sincronizando" pulse />
<StatusIndicator tone="danger" />`,
  api: [
    { name: 'tone', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'", defaultValue: "'neutral'", description: 'Color del punto.' },
    { name: 'label', type: 'ReactNode', description: 'Texto junto al punto; sin él, solo color (añade aria-label).' },
    { name: 'pulse', type: 'boolean', defaultValue: 'false', description: 'Animación para estados en vivo.' },
    { name: 'showDot', type: 'boolean', defaultValue: 'true', description: 'Oculta el punto si solo quieres el texto.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

const cardEntry: ShowcaseEntry = {
  id: 'card',
  name: 'Card',
  category: 'Datos',
  description:
    'Contenedor con borde para agrupar contenido afín. Se compone con CardHeader, CardTitle, CardDescription, CardContent y CardFooter.',
  preview: (
    <Inline gap={4} wrap align="flex-start">
      <Card variant="default" padding="md" style={{ width: 280 }}>
        <CardHeader divider>
          <CardTitle as="h3">Protocolo ONCO-01</CardTitle>
          <CardDescription>14 participantes · multicenter</CardDescription>
        </CardHeader>
        <CardContent>
          <Text size="sm" tone="secondary">
            Estado actual: recruitment.
          </Text>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="ghost">
            Detalle
          </Button>
        </CardFooter>
      </Card>
      <Card variant="elevated" padding="md" style={{ width: 200 }}>
        <CardContent>
          <Text size="sm">Variante elevated</Text>
        </CardContent>
      </Card>
    </Inline>
  ),
  code: `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '@medical/design-system';

<Card variant="default" padding="md">
  <CardHeader divider>
    <CardTitle as="h3">Protocolo ONCO-01</CardTitle>
    <CardDescription>14 participantes · multicenter</CardDescription>
  </CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter><Button size="sm" variant="ghost">Detalle</Button></CardFooter>
</Card>`,
  api: [
    { name: 'variant', type: "'default' | 'outlined' | 'elevated' | 'flat' | 'interactive'", defaultValue: "'default'", description: 'Estilo de la superficie.' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Relleno interior.' },
    { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Añade hover y foco de elemento pulsable.' },
    { name: 'CardHeader.divider', type: 'boolean', defaultValue: 'false', description: 'Línea separadora bajo la cabecera.' },
    { name: 'CardTitle.as', type: "'h1'…'h6'", description: 'Nivel de encabezado correcto para la jerarquía.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

const tableEntry: ShowcaseEntry = {
  id: 'table',
  name: 'Table',
  category: 'Datos',
  description:
    'Tabla semántica para pocos datos. Compón TableHeader, TableBody, TableRow, TableHead y TableCell; striped, dense y hoverable ajustan la densidad y la lectura.',
  preview: (
    <Table striped dense hoverable style={{ width: '100%' }}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Centro</TableHead>
          <TableHead align="right">Adherencia</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>CT-001</TableCell>
          <TableCell>Hospital Central</TableCell>
          <TableCell align="right">96%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>CT-002</TableCell>
          <TableCell>Clínica Norte</TableCell>
          <TableCell align="right">88%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  code: `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@medical/design-system';

<Table striped dense hoverable>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Centro</TableHead>
      <TableHead align="right">Adherencia</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>CT-001</TableCell>
      <TableCell>Hospital Central</TableCell>
      <TableCell align="right">96%</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  api: [
    { name: 'striped', type: 'boolean', defaultValue: 'false', description: 'Bandas alternas para seguir la fila.' },
    { name: 'dense', type: 'boolean', defaultValue: 'false', description: 'Menos altura por fila.' },
    { name: 'hoverable', type: 'boolean', defaultValue: 'false', description: 'Resalta la fila al pasar el puntero.' },
    { name: 'TableCell.align', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alineación; usa right para números.' },
  ],
  theming: 'Las bandas y el hover salen de los tokens de superficie y divisor del tema activo.',
};

/* ------------------------------------------------------------------ */
/* DataTable                                                           */
/* ------------------------------------------------------------------ */

type Socio = { id: string; centro: string; adherencia: number; estado: string };

const SOCIOS: Socio[] = [
  { id: 'CT-001', centro: 'Hospital Central', adherencia: 96, estado: 'Activo' },
  { id: 'CT-002', centro: 'Clínica Norte', adherencia: 88, estado: 'Activo' },
  { id: 'CT-003', centro: 'Instituto Sur', adherencia: 64, estado: 'Pausado' },
];

function DataTableDemo() {
  const [orden, setOrden] = React.useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(null);

  const datos = React.useMemo(() => {
    if (!orden) return SOCIOS;
    const dir = orden.direction === 'asc' ? 1 : -1;
    return [...SOCIOS].sort((a, b) => {
      const va = a[orden.columnId as keyof Socio];
      const vb = b[orden.columnId as keyof Socio];
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }, [orden]);

  return (
    <Stack gap={3}>
      <DataTable
        data={datos}
        getRowId={(r) => r.id}
        sort={orden}
        onSortChange={setOrden}
        striped
        dense
        emptyState={<Text tone="secondary">Sin resultados</Text>}
        columns={[
          { id: 'id', accessorKey: 'id', header: 'ID', width: 100 },
          { id: 'centro', accessorKey: 'centro', header: 'Centro' },
          {
            id: 'adherencia',
            accessorKey: 'adherencia',
            header: 'Adherencia',
            align: 'right',
            cell: (row) => `${row.adherencia}%`,
          },
          {
            id: 'estado',
            accessorKey: 'estado',
            header: 'Estado',
            cell: (row) => (
              <Tag size="sm" tone={row.estado === 'Activo' ? 'success' : 'warning'}>
                {row.estado}
              </Tag>
            ),
          },
        ]}
      />
      <Text size="sm" tone="secondary">
        Pulsa una cabecera para ordenar. El estado vive en tu app: <code>sort</code> +{' '}
        <code>onSortChange</code>.
      </Text>
    </Stack>
  );
}

const dataTableEntry: ShowcaseEntry = {
  id: 'data-table',
  name: 'DataTable',
  category: 'Datos',
  description:
    'Tabla con orden, selección, paginación, acciones de fila y estados de carga/error/vacío. Para datasets medianos o grandes; para pocos datos, Table.',
  preview: () => <DataTableDemo />,
  code: `import { DataTable } from '@medical/design-system';

<DataTable
  columns={[
    { id: 'id', accessorKey: 'id', header: 'ID', width: 100 },
    { id: 'centro', accessorKey: 'centro', header: 'Centro' },
    { id: 'adherencia', header: 'Adherencia', align: 'right',
      cell: (row) => \`\${row.adherencia}%\` },
  ]}
  data={socios}
  getRowId={(row) => row.id}
  sort={orden}
  onSortChange={setOrden}
  striped
/>`,
  api: [
    { name: 'columns', type: 'DataTableColumn<T>[]', description: 'Obligatorio. Definición de cada columna.' },
    { name: 'data', type: 'T[]', description: 'Obligatorio. Filas.' },
    { name: 'getRowId', type: '(row: T) => string', description: 'Obligatorio. Clave estable por fila.' },
    { name: 'sort / onSortChange', type: 'DataTableSortState | null / fn', description: 'Orden controlado desde tu app.' },
    { name: 'selection', type: '{ selectedIds, onSelectionChange }', description: 'Selección de filas.' },
    { name: 'pagination', type: 'object', description: 'Paginación integrada (page, pageCount, onPageChange…).' },
    { name: 'isLoading / isError / emptyState', type: 'boolean / boolean / ReactNode', description: 'Estados de carga, error y vacío.' },
    { name: 'renderRowActions', type: '(row: T) => ReactNode', description: 'Acciones al final de cada fila.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Pagination                                                          */
/* ------------------------------------------------------------------ */

function PaginationDemo() {
  const [pagina, setPagina] = React.useState(3);
  return (
    <Stack gap={3}>
      <Pagination
        page={pagina}
        pageCount={12}
        onPageChange={setPagina}
        totalItems={238}
        pageSize={20}
        showTotal
        showPageNumbers
      />
      <Text size="sm" tone="secondary">
        Página actual: <strong>{pagina}</strong> de 12
      </Text>
    </Stack>
  );
}

const paginationEntry: ShowcaseEntry = {
  id: 'pagination',
  name: 'Pagination',
  category: 'Datos',
  description:
    'Navegación entre páginas de un listado. Controla el estado desde fuera: el componente no guarda la página.',
  preview: () => <PaginationDemo />,
  code: `import { Pagination } from '@medical/design-system';

<Pagination
  page={pagina}
  pageCount={12}
  onPageChange={setPagina}
  totalItems={238}
  pageSize={20}
  showTotal
/>`,
  api: [
    { name: 'page / pageCount', type: 'number', description: 'Obligatorios. Página actual y total.' },
    { name: 'onPageChange', type: '(page: number) => void', description: 'Obligatorio. Avisa del cambio.' },
    { name: 'totalItems / pageSize', type: 'number', description: 'Para mostrar el resumen y el selector de tamaño.' },
    { name: 'showTotal', type: 'boolean', defaultValue: 'false', description: 'Muestra «1–20 de 238».' },
    { name: 'showPageNumbers', type: 'boolean', defaultValue: 'true', description: 'Muestra los números de página.' },
  ],
};

/* ------------------------------------------------------------------ */
/* KeyValueList                                                        */
/* ------------------------------------------------------------------ */

const kvEntry: ShowcaseEntry = {
  id: 'key-value-list',
  name: 'KeyValueList',
  category: 'Datos',
  description:
    'Lista de pares clave/valor para fichas de detalle: paciente, protocolo, centro. Mucho más legible que una tabla de dos columnas.',
  preview: (
    <KeyValueList
      items={[
        { key: 'ID de protocolo', value: 'ONCO-01' },
        { key: 'Estado', value: <Tag size="sm" tone="success">Recruitment</Tag> },
        { key: 'Centros', value: '14 activos' },
        { key: 'Fecha de inicio', value: '12/03/2026' },
      ]}
    />
  ),
  code: `import { KeyValueList } from '@medical/design-system';

<KeyValueList
  items={[
    { key: 'ID de protocolo', value: 'ONCO-01' },
    { key: 'Estado', value: <Tag tone="success">Recruitment</Tag> },
    { key: 'Centros', value: '14 activos' },
  ]}
/>`,
  api: [
    { name: 'items', type: '{ key: ReactNode; value: ReactNode }[]', description: 'Obligatorio. Los pares a mostrar.' },
  ],
};

/* ------------------------------------------------------------------ */

export const DATOS: ShowcaseEntry[] = [
  tagEntry,
  chipEntry,
  badgeEntry,
  avatarEntry,
  statusEntry,
  cardEntry,
  tableEntry,
  dataTableEntry,
  paginationEntry,
  kvEntry,
];
