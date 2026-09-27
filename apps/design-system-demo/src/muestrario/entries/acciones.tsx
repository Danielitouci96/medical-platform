import * as React from 'react';
import {
  Button,
  IconButton,
  ButtonGroup,
  Link,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuItemShortcut,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Inline,
  Stack,
  Box,
} from '@danielitouci96/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const buttonEntry: ShowcaseEntry = {
  id: 'button',
  name: 'Button',
  category: 'Acciones',
  description:
    'Acción principal de una vista. Elige la variante según la jerarquía de la pantalla: una sola acción primaria por contexto, y usa variantes secundarias o terciarias para el resto.',
  preview: (
    <Inline gap={3} wrap>
      <Button variant="primary">Guardar cambios</Button>
      <Button variant="secondary">Duplicar</Button>
      <Button variant="outline" iconLeft="Download">
        Exportar CSV
      </Button>
      <Button variant="ghost">Cancelar</Button>
      <Button variant="danger" iconLeft="Trash2">
        Eliminar
      </Button>
      <Button loading>Sincronizando…</Button>
      <Button disabled>Endpoint bloqueado</Button>
    </Inline>
  ),
  code: `import { Button } from '@danielitouci96/design-system';

<Button variant="primary">Guardar cambios</Button>

<Button variant="outline" iconLeft="Download">Exportar CSV</Button>

<Button variant="danger" loading>Sincronizando…</Button>`,
  api: [
    { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link'", defaultValue: "'primary'", description: 'Jerarquía visual de la acción.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Tamaño del control.' },
    { name: 'iconLeft / iconRight', type: 'IconName', description: 'Icono de lucide-react antes o después de la etiqueta.' },
    { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Ocupa el ancho completo del contenedor.' },
    { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Muestra spinner y deshabilita el botón.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Deshabilita el botón.' },
    { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Renderiza como el hijo clonado (para usar con enlaces).' },
  ],
  theming: 'Usa los tokens --color-secondary (variante primaria) y sus estados hover/active; cambia con el tema de marca (Grove, Onco, Cardio).',
};

/* ------------------------------------------------------------------ */
/* IconButton                                                          */
/* ------------------------------------------------------------------ */

const iconButtonEntry: ShowcaseEntry = {
  id: 'icon-button',
  name: 'IconButton',
  category: 'Acciones',
  description:
    'Acción sin etiqueta de texto. Siempre necesita aria-label: el icono por sí solo no es un nombre accesible.',
  preview: (
    <Inline gap={3} wrap>
      <IconButton icon="Bell" aria-label="Notificaciones" />
      <IconButton icon="Search" aria-label="Buscar" variant="primary" />
      <IconButton icon="Settings" aria-label="Ajustes" variant="outline" />
      <IconButton icon="Trash2" aria-label="Eliminar" variant="danger" />
      <IconButton icon="Upload" aria-label="Subiendo" loading />
      <IconButton icon="Lock" aria-label="Bloqueado" disabled />
    </Inline>
  ),
  code: `import { IconButton } from '@danielitouci96/design-system';

<IconButton icon="Bell" aria-label="Notificaciones" />

<IconButton icon="Search" variant="primary" aria-label="Buscar" />`,
  api: [
    { name: 'icon', type: 'IconName', description: 'Obligatorio. Nombre del icono de lucide-react.' },
    { name: 'variant', type: 'ButtonVariant', defaultValue: "'ghost'", description: 'Mismas variantes que Button.' },
    { name: 'size', type: 'ButtonSize', defaultValue: "'md'", description: 'Tamaño del control.' },
    { name: 'aria-label', type: 'string', description: 'Obligatorio: el botón no tiene texto visible.' },
    { name: 'loading / disabled', type: 'boolean', defaultValue: 'false', description: 'Estados no interactivos.' },
  ],
};

/* ------------------------------------------------------------------ */
/* ButtonGroup                                                         */
/* ------------------------------------------------------------------ */

const buttonGroupEntry: ShowcaseEntry = {
  id: 'button-group',
  name: 'ButtonGroup',
  category: 'Acciones',
  description:
    'Agrupa botones que cooperan entre sí (segmentos, vistas, acciones encadenadas). Con attached se vuelven una sola pieza con bordes compartidos.',
  preview: (
    <Stack gap={4}>
      <ButtonGroup attached variant="outline" size="sm">
        <Button variant="outline" size="sm">
          Día
        </Button>
        <Button variant="primary" size="sm">
          Semana
        </Button>
        <Button variant="outline" size="sm">
          Mes
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" size="sm">
        <Button size="sm" iconLeft="Copy">
          Copiar enlace
        </Button>
        <Button size="sm" iconLeft="Download">
          Descargar
        </Button>
      </ButtonGroup>
    </Stack>
  ),
  code: `import { ButtonGroup, Button } from '@danielitouci96/design-system';

<ButtonGroup attached variant="outline" size="sm">
  <Button variant="outline" size="sm">Día</Button>
  <Button variant="primary" size="sm">Semana</Button>
  <Button variant="outline" size="sm">Mes</Button>
</ButtonGroup>`,
  api: [
    { name: 'attached', type: 'boolean', defaultValue: 'false', description: 'Pega los botones y une los bordes.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Dirección del grupo.' },
    { name: 'variant', type: 'ButtonVariant', defaultValue: "'secondary'", description: 'Variante por defecto de los hijos.' },
    { name: 'size', type: 'ButtonSize', defaultValue: "'md'", description: 'Tamaño por defecto de los hijos.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Link                                                                */
/* ------------------------------------------------------------------ */

const linkEntry: ShowcaseEntry = {
  id: 'link',
  name: 'Link',
  category: 'Acciones',
  description:
    'Navegación a otro sitio. Si la acción ocurre en la misma pantalla, usa Button; Link es para ir a otra URL.',
  preview: (
    <Stack gap={3}>
      <Inline gap={4} wrap>
        <Link href="#docs">Ver documentación</Link>
        <Link href="#docs" variant="subtle">
          Enlace sutil
        </Link>
        <Link href="#docs" underline="always">
          Con subrayado
        </Link>
      </Inline>
      <Box>
        <Link href="https://design-system.local" external variant="button">
          Abrir en otra pestaña
        </Link>
      </Box>
    </Stack>
  ),
  code: `import { Link } from '@danielitouci96/design-system';

<Link href="/pacientes">Ver pacientes</Link>

<Link href="https://ejemplo.com" external variant="button">
  Abrir en otra pestaña
</Link>`,
  api: [
    { name: 'variant', type: "'default' | 'subtle' | 'button'", defaultValue: "'default'", description: "'button' lo hace parecer un botón." },
    { name: 'underline', type: "'always' | 'hover' | 'none'", defaultValue: "'hover'", description: 'Comportamiento del subrayado.' },
    { name: 'external', type: 'boolean', defaultValue: 'false', description: 'Añade icono de salida y atributos seguros.' },
  ],
  theming: 'El color de enlace sale de --color-secondary, con su estado hover correspondiente.',
};

/* ------------------------------------------------------------------ */
/* DropdownMenu                                                        */
/* ------------------------------------------------------------------ */

function DropdownDemo() {
  const [ultimo, setUltimo] = React.useState('—');
  return (
    <Stack gap={3}>
      <Inline gap={3} wrap>
        <DropdownMenu trigger={<Button variant="outline" iconRight="ChevronDown">Acciones</Button>}>
          <DropdownMenuLabel>Documento</DropdownMenuLabel>
          <DropdownMenuItem icon="Pencil" onSelect={() => setUltimo('Renombrar')}>
            Renombrar
          </DropdownMenuItem>
          <DropdownMenuItem icon="Copy" onSelect={() => setUltimo('Duplicar')}>
            Duplicar
            <DropdownMenuItemShortcut>⌘D</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon="Trash2" danger onSelect={() => setUltimo('Eliminar')}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenu>
        <DropdownMenu align="end" trigger={<IconButton variant="ghost" icon="MoreVertical" aria-label="Más opciones" />}>
          <DropdownMenuItem onSelect={() => setUltimo('Ver detalles')}>Ver detalles</DropdownMenuItem>
        </DropdownMenu>
      </Inline>
      <Box className="ms-demo-note">
        Última acción: <strong>{ultimo}</strong>
      </Box>
    </Stack>
  );
}

const dropdownEntry: ShowcaseEntry = {
  id: 'dropdown-menu',
  name: 'DropdownMenu',
  category: 'Acciones',
  description:
    'Menú contextual con las acciones secundarias de un elemento. Se abre con un trigger y cierra sola al elegir o al hacer clic fuera.',
  preview: () => <DropdownDemo />,
  code: `import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Button,
} from '@danielitouci96/design-system';

<DropdownMenu trigger={<Button variant="outline" iconRight="ChevronDown">Acciones</Button>}>
  <DropdownMenuLabel>Documento</DropdownMenuLabel>
  <DropdownMenuItem icon="Pencil" onSelect={editar}>Renombrar</DropdownMenuItem>
  <DropdownMenuItem icon="Copy" onSelect={duplicar}>Duplicar</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem icon="Trash2" danger onSelect={eliminar}>Eliminar</DropdownMenuItem>
</DropdownMenu>`,
  api: [
    { name: 'trigger', type: 'ReactNode', description: 'Elemento que abre el menú. Puede ser Button o IconButton.' },
    { name: 'align / side', type: "'start' | 'center' | 'end' / 'top' | 'right' | 'bottom' | 'left'", defaultValue: "'end' / 'bottom'", description: 'Alineación y lado respecto al trigger.' },
    { name: 'sideOffset', type: 'number', description: 'Separación en píxeles respecto al trigger.' },
    { name: 'DropdownMenuItem.icon', type: 'IconName', description: 'Icono opcional del ítem.' },
    { name: 'DropdownMenuItem.danger', type: 'boolean', defaultValue: 'false', description: 'Pinta el ítem como acción destructiva.' },
  ],
  floatingPreview: true,
};

export const ACCIONES: ShowcaseEntry[] = [
  buttonEntry,
  iconButtonEntry,
  buttonGroupEntry,
  linkEntry,
  dropdownEntry,
];
