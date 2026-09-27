import * as React from 'react';
import {
  Alert,
  Spinner,
  Skeleton,
  Progress,
  Modal,
  ConfirmDialog,
  Drawer,
  Popover,
  Tooltip,
  ToastProvider,
  ToastViewport,
  Toast,
  Button,
  Inline,
  Stack,
  Box,
  Text,
  FormField,
  Input,
} from '@danielitouci96/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* Alert                                                               */
/* ------------------------------------------------------------------ */

const alertEntry: ShowcaseEntry = {
  id: 'alert',
  name: 'Alert',
  category: 'Feedback',
  description:
    'Mensaje en línea que explica el estado de algo: un error de validación, un aviso de seguridad o una confirmación. No interrumpe el flujo.',
  preview: (
    <Stack gap={3}>
      <Alert tone="info" title="Sincronización programada">
        Los datos se actualizarán a las 02:00 h.
      </Alert>
      <Alert tone="success" title="Cambios guardados">
        El protocolo ya está disponible para el equipo.
      </Alert>
      <Alert tone="warning" variant="outlined" title="Firmas pendientes">
        Quedan 2 Longitudinales sin firmar.
      </Alert>
      <Alert tone="error" title="No se pudo sincronizar" onDismiss={() => undefined}>
        Revisa la conexión del servidor deophage.
      </Alert>
    </Stack>
  ),
  code: `import { Alert } from '@danielitouci96/design-system';

<Alert tone="success" title="Cambios guardados">
  El protocolo ya está disponible para el equipo.
</Alert>

<Alert tone="error" title="No se pudo sincronizar" onDismiss={cerrar}>
  Revisa la conexión con el servidor.
</Alert>`,
  api: [
    { name: 'tone', type: "'info' | 'success' | 'warning' | 'error'", defaultValue: "'info'", description: 'Severidad del mensaje.' },
    { name: 'variant', type: "'soft' | 'outlined' | 'solid'", defaultValue: "'soft'", description: 'Peso visual del fondo.' },
    { name: 'title', type: 'ReactNode', description: 'Línea de título opcional.' },
    { name: 'icon', type: 'IconName', defaultValue: '—', description: 'Icono; si se omite, se elige por tono.' },
    { name: 'onDismiss', type: '() => void', description: 'Muestra la X de cierre y define su acción.' },
    { name: 'role', type: "'alert' | 'status'", description: 'Lectura por lectores de pantalla.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Spinner                                                             */
/* ------------------------------------------------------------------ */

const spinnerEntry: ShowcaseEntry = {
  id: 'spinner',
  name: 'Spinner',
  category: 'Feedback',
  description:
    'Indica que algo está cargando. Usa tone="current" dentro de botones o textos para que herede el color.',
  preview: (
    <Inline gap={5} wrap align="center">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" tone="primary" />
      <Spinner size="lg" tone="primary" />
      <Spinner size="xl" label="Cargando participantes" />
    </Inline>
  ),
  code: `import { Spinner } from '@danielitouci96/design-system';

<Spinner size="sm" />
<Spinner size="lg" tone="primary" />
<Spinner size="xl" label="Cargando participantes" />`,
  api: [
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Diámetro del spinner.' },
    { name: 'tone', type: "'default' | 'primary' | 'current'", defaultValue: "'current'", description: "'current' hereda el color del texto que lo contiene." },
    { name: 'label', type: 'string', description: 'Texto accesible para lectores de pantalla.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Skeleton                                                            */
/* ------------------------------------------------------------------ */

const skeletonEntry: ShowcaseEntry = {
  id: 'skeleton',
  name: 'Skeleton',
  category: 'Feedback',
  description:
    'Placeholder con la silueta del contenido real. Sustituye al spinner cuando la forma de la carga se conoce: la pantalla no da saltos al llegar los datos.',
  preview: (
    <Stack gap={4}>
      <Inline gap={3} wrap>
        <Skeleton width={120} height={40} />
        <Skeleton circle width={48} height={48} />
        <Skeleton width={200} height={16} />
      </Inline>
      <Stack gap={2}>
        <Skeleton text width="80%" />
        <Skeleton text width="60%" />
        <Skeleton text width="40%" />
      </Stack>
    </Stack>
  ),
  code: `import { Skeleton } from '@danielitouci96/design-system';

/* Con la forma del contenido que va a llegar */
<Skeleton width={200} height={16} />
<Skeleton circle width={48} height={48} />

/* Líneas de texto */
<Skeleton text width="80%" />
<Skeleton text width="60%" />`,
  api: [
    { name: 'width / height', type: 'number | string', description: 'Dimensiones; aceptan px o unidades CSS.' },
    { name: 'circle', type: 'boolean', defaultValue: 'false', description: 'Lo vuelve circular (avatares, iconos).' },
    { name: 'text', type: 'boolean', defaultValue: 'false', description: 'Línea de texto con altura y ancho automáticos.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

const progressEntry: ShowcaseEntry = {
  id: 'progress',
  name: 'Progress',
  category: 'Feedback',
  description:
    'Barra de progreso con valor conocido. Si no sabes cuánto falta, usa Spinner: una barra que se congela miente.',
  preview: (
    <Stack gap={4}>
      <Progress value={30} showValue ariaLabel="Adherencia" />
      <Progress value={72} tone="success" showValue ariaLabel="Adherencia" />
      <Progress value={88} tone="warning" size="lg" ariaLabel="Adherencia" />
      <Progress value={100} tone="danger" size="sm" ariaLabel="Adherencia" />
    </Stack>
  ),
  code: `import { Progress } from '@danielitouci96/design-system';

<Progress value={72} tone="success" showValue ariaLabel="Adherencia" />`,
  api: [
    { name: 'value', type: 'number', description: 'Obligatorio. Progreso actual.' },
    { name: 'max', type: 'number', defaultValue: '100', description: 'Valor máximo.' },
    { name: 'tone', type: "'default' | 'info' | 'success' | 'warning' | 'danger'", defaultValue: "'default'", description: 'Color según el avance.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Grosor de la barra.' },
    { name: 'showValue', type: 'boolean', defaultValue: 'false', description: 'Muestra el porcentaje a la derecha.' },
    { name: 'ariaLabel', type: 'string', description: 'Nombre accesible de la barra.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

function ModalDemo() {
  const [abierto, setAbierto] = React.useState(false);
  const [confirmar, setConfirmar] = React.useState(false);
  return (
    <Stack gap={3}>
      <Inline gap={3} wrap>
        <Button variant="primary" onClick={() => setAbierto(true)}>
          Abrir modal
        </Button>
        <Button variant="danger" onClick={() => setConfirmar(true)}>
          Abrir confirmación
        </Button>
      </Inline>

      <Modal
        open={abierto}
        onOpenChange={setAbierto}
        title="Editar protocolo"
        description="Los cambios se aplican a todos los centros activos."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAbierto(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setAbierto(false)}>
              Guardar
            </Button>
          </>
        }
      >
        <Text tone="secondary">
          El modal se cierra con Escape, con la X y al hacer clic fuera. El foco queda atrapado dentro
          mientras está abierto.
        </Text>
      </Modal>

      <ConfirmDialog
        open={confirmar}
        onOpenChange={setConfirmar}
        title="¿Retirar el protocolo?"
        description="Esta acción no se puede deshacer."
        confirmLabel="Retirar"
        tone="danger"
        onConfirm={() => setConfirmar(false)}
        onCancel={() => setConfirmar(false)}
      />
    </Stack>
  );
}

const modalEntry: ShowcaseEntry = {
  id: 'modal',
  name: 'Modal',
  category: 'Feedback',
  description:
    'Diálogo modal para tareas que exigen atención. Se renderiza en un portal, atrapa el foco y se cierra con Escape. ConfirmDialog es la variante con confirmar/cancelar ya montados.',
  preview: () => <ModalDemo />,
  code: `import { Modal, ConfirmDialog, Button } from '@danielitouci96/design-system';

<Modal
  open={abierto}
  onOpenChange={setAbierto}
  title="Editar protocolo"
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={() => setAbierto(false)}>Cancelar</Button>
      <Button variant="primary" onClick={guardar}>Guardar</Button>
    </>
  }
>
  Contenido del diálogo
</Modal>

<ConfirmDialog
  open={confirmar}
  onOpenChange={setConfirmar}
  title="¿Retirar el protocolo?"
  tone="danger"
  confirmLabel="Retirar"
  onConfirm={retirar}
/>`,
  api: [
    { name: 'open', type: 'boolean', description: 'Obligatorio. Controla la visibilidad desde tu estado.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Obligatorio. Avisa de cualquier cambio (Escape, clic fuera, X).' },
    { name: 'title', type: 'string', description: 'Obligatorio. Se anuncia al abrirse.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Ancho del diálogo.' },
    { name: 'footer', type: 'ReactNode', description: 'Botones de acción; ponlos a la derecha.' },
    { name: 'ConfirmDialog.tone', type: "'default' | 'danger'", defaultValue: "'default'", description: "'danger' pinta la acción destructiva en rojo." },
  ],
};

/* ------------------------------------------------------------------ */
/* Drawer                                                              */
/* ------------------------------------------------------------------ */

function DrawerDemo() {
  const [abierto, setAbierto] = React.useState(false);
  const [inverso, setInverso] = React.useState(false);
  return (
    <>
      <Stack gap={3}>
        <Button variant="outline" onClick={() => setAbierto(true)}>
          Abrir panel lateral
        </Button>
        <label className="ms-inline-check">
          <input
            type="checkbox"
            checked={inverso}
            onChange={(e) => setInverso(e.target.checked)}
          />
          Superficie inversa (fondo verde)
        </label>
      </Stack>
      <Drawer
        open={abierto}
        onOpenChange={setAbierto}
        title="Detalle del participante"
        description="ECOG 1 · 14 participantes"
        side="right"
        size="md"
        surface={inverso ? 'inverse' : 'default'}
        className={inverso ? 'ms-drawer--inverso' : undefined}
        footer={<Button variant="primary" onClick={() => setAbierto(false)}>Listo</Button>}
      >
        <Text tone="secondary">
          El drawer es un modal pegado al borde. Úsalo para detalle secundario que no quieres
          interrumpir con un modal a pantalla completa.
        </Text>
        <FormField label="Observaciones" helperText="Se guarda al cerrar el panel.">
          <Input placeholder="Sin observaciones" />
        </FormField>
        <Button variant="ghost">Cancelar</Button>
      </Drawer>
    </>
  );
}

const drawerEntry: ShowcaseEntry = {
  id: 'drawer',
  name: 'Drawer',
  category: 'Feedback',
  description:
    'Panel lateral que se desliza desde un borde. Para detalle complementario que no debe interrumpir la pantalla completa.',
  preview: () => <DrawerDemo />,
  code: `import { Drawer, Button } from '@danielitouci96/design-system';

<Drawer
  open={abierto}
  onOpenChange={setAbierto}
  title="Detalle del participante"
  side="right"
  size="md"
  footer={<Button variant="primary" onClick={cerrar}>Listo</Button>}
>
  Contenido del panel
</Drawer>`,
  api: [
    { name: 'open / onOpenChange', type: 'boolean / (open: boolean) => void', description: 'Control del estado, igual que Modal.' },
    { name: 'side', type: "'left' | 'right'", defaultValue: "'right'", description: 'Borde desde el que entra.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Ancho del panel.' },
    { name: 'title / description', type: 'ReactNode', description: 'Cabecera del panel.' },
    { name: 'footer', type: 'ReactNode', description: 'Acciones fijadas al pie.' },
    { name: 'surface', type: "'default' | 'inverse'", defaultValue: "'default'", description: "Con 'inverse' los componentes anidados (label, helper, botón ghost, divisores) se re-teman para leerse sobre un fondo oscuro o saturado. Combina con los tokens --drawer-*." },
  ],
  theming:
    'Superficie con --drawer-background / --drawer-text / --drawer-border. Añade surface="inverse" si el fondo no es el canvas claro: el scope data-med-surface invierte texto, bordes y rellenos de interacción en todo el subárbol.',
};

/* ------------------------------------------------------------------ */
/* Popover                                                             */
/* ------------------------------------------------------------------ */

function PopoverDemo() {
  return (
    <Popover
      trigger={<Button variant="outline" iconRight="ChevronDown">Ver detalle</Button>}
      title="Adherencia del centro"
      align="start"
      side="bottom"
      closeable
    >
      <Text size="sm" tone="secondary">
        96% devisitas completadas en los últimos 30 días.
      </Text>
    </Popover>
  );
}

const popoverEntry: ShowcaseEntry = {
  id: 'popover',
  name: 'Popover',
  category: 'Feedback',
  description:
    'Contenido flotante anclado a un trigger. Para información breve y complementaria — si necesita una acción principal, usa Modal.',
  preview: () => <PopoverDemo />,
  code: `import { Popover, Button } from '@danielitouci96/design-system';

<Popover
  trigger={<Button variant="outline" iconRight="ChevronDown">Ver detalle</Button>}
  title="Adherencia del centro"
  align="start"
  closeable
>
  96% de visitas completadas en los últimos 30 días.
</Popover>`,
  api: [
    { name: 'trigger', type: 'ReactNode', description: 'Elemento que ancla el popover.' },
    { name: 'align / side', type: "'start' | 'center' | 'end' / 'top' | 'right' | 'bottom' | 'left'", defaultValue: "'center' / 'bottom'", description: 'Posición respecto al trigger.' },
    { name: 'title', type: 'ReactNode', description: 'Cabecera opcional del panel.' },
    { name: 'closeable', type: 'boolean', defaultValue: 'false', description: 'Muestra la X de cierre.' },
    { name: 'open / onOpenChange', type: 'boolean / fn', description: 'Control opcional; si se omiten, se gestiona solo.' },
  ],
  floatingPreview: true,
};

/* ------------------------------------------------------------------ */
/* Tooltip                                                             */
/* ------------------------------------------------------------------ */

const tooltipEntry: ShowcaseEntry = {
  id: 'tooltip',
  name: 'Tooltip',
  category: 'Feedback',
  description:
    'Ayuda breve al pasar el foco o el puntero. Nunca lleva información esencial: no es accesible con el dedo ni sobrevive al teclado en muchos casos.',
  preview: (
    <Inline gap={4} wrap>
      <Tooltip content="Sincroniza los datos del centro">
        <Button variant="ghost">Pasa el puntero</Button>
      </Tooltip>
      <Tooltip content="Protocolo v3 · 14 participantes" side="right" delayDuration={0}>
        <Button variant="outline">Sin retardo</Button>
      </Tooltip>
    </Inline>
  ),
  code: `import { Tooltip, Button } from '@danielitouci96/design-system';

<Tooltip content="Sincroniza los datos del centro">
  <Button variant="ghost">Sincronizar</Button>
</Tooltip>`,
  api: [
    { name: 'content', type: 'ReactNode', description: 'Obligatorio. Lo que se muestra.' },
    { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'top'", description: 'Lado respecto al trigger.' },
    { name: 'sideOffset', type: 'number', description: 'Separación en píxeles.' },
    { name: 'delayDuration', type: 'number', description: 'Espera antes de abrir, en ms.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */

function ToastDemo() {
  const [toast, setToast] = React.useState<{ tone: 'info' | 'success' | 'warning' | 'error'; title: string; description: string } | null>(null);

  const lanzar = (tone: 'info' | 'success' | 'warning' | 'error') => {
    setToast(null);
    window.setTimeout(
      () =>
        setToast({
          tone,
          title:
            tone === 'success' ? 'Cambios guardados'
            : tone === 'error' ? 'No se pudo guardar'
            : tone === 'warning' ? 'Revisa los campos'
            : 'Sincronizando datos',
          description: 'Los cambios se aplican a todos los centros activos.',
        }),
      40,
    );
  };

  return (
    <ToastProvider>
      <ToastViewport position="bottom-right" />
      <Stack gap={3}>
        <Inline gap={2} wrap>
          <Button size="sm" variant="outline" onClick={() => lanzar('success')}>Éxito</Button>
          <Button size="sm" variant="outline" onClick={() => lanzar('error')}>Error</Button>
          <Button size="sm" variant="outline" onClick={() => lanzar('warning')}>Aviso</Button>
          <Button size="sm" variant="ghost" onClick={() => lanzar('info')}>Info</Button>
        </Inline>
        <Box className="ms-demo-note">
          El toast se apila en la esquina inferior derecha y se cierra solo.
        </Box>
      </Stack>
      {toast ? (
        <Toast
          open
          onOpenChange={(o) => !o && setToast(null)}
          tone={toast.tone}
          title={toast.title}
          description={toast.description}
          action={
            <Button size="xs" variant="ghost" onClick={() => setToast(null)}>
              Cerrar
            </Button>
          }
        />
      ) : null}
    </ToastProvider>
  );
}

const toastEntry: ShowcaseEntry = {
  id: 'toast',
  name: 'Toast',
  category: 'Feedback',
  description:
    'Aviso efímero y no bloqueante. Necesita ToastProvider y ToastViewport en la app; el Toast en sí se controla con open/onOpenChange.',
  preview: () => <ToastDemo />,
  code: `import { ToastProvider, ToastViewport, Toast } from '@danielitouci96/design-system';

/* Una vez, en la raíz de la app */
<ToastProvider>
  <ToastViewport position="bottom-right" />
  {children}
</ToastProvider>

/* Donde quieras notificar */
<Toast
  open={abierto}
  onOpenChange={setAbierto}
  tone="success"
  title="Cambios guardados"
  description="Los cambios se aplican a todos los centros activos."
/>`,
  api: [
    { name: 'ToastProvider', type: '—', description: 'Obligatorio en la raíz. Sin él, Toast no funciona.' },
    { name: 'ToastViewport.position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", defaultValue: "'bottom-right'", description: 'Dónde se apilan los avisos.' },
    { name: 'tone', type: "'info' | 'success' | 'warning' | 'error'", defaultValue: "'info'", description: 'Severidad del aviso.' },
    { name: 'title / description', type: 'ReactNode', description: 'Cuerpo del aviso.' },
    { name: 'action', type: 'ReactNode', description: 'Botón de acción, p. ej. «Deshacer».' },
  ],
};

export const FEEDBACK: ShowcaseEntry[] = [
  alertEntry,
  spinnerEntry,
  skeletonEntry,
  progressEntry,
  modalEntry,
  drawerEntry,
  popoverEntry,
  tooltipEntry,
  toastEntry,
];
