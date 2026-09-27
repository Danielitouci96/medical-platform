import * as React from 'react';
import {
  FormField,
  Input,
  Textarea,
  PasswordInput,
  SearchInput,
  NumberInput,
  Select,
  SelectItem,
  MultiSelect,
  Combobox,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Inline,
  Stack,
  Text,
} from '@danielitouci96/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* FormField                                                           */
/* ------------------------------------------------------------------ */

const formFieldEntry: ShowcaseEntry = {
  id: 'form-field',
  name: 'FormField',
  category: 'Formularios',
  description:
    'Envoltorio de un campo: etiqueta, descripción, texto de ayuda y error. Genera los ids y los aria-* correctos, y conecta el error con el campo.',
  preview: (
    <Stack gap={4}>
      <FormField label="Nombre del protocolo" htmlFor="pf-1" required helperText="Máx. 80 caracteres">
        <Input id="pf-1" defaultValue="ONCO-01" />
      </FormField>
      <FormField label="Centro coordinador" description="Solo coordinador principal" errorMessage="Este centro ya está asignado">
        <Input id="pf-2" validationState="error" defaultValue="Hospital Central" />
      </FormField>
      <FormField label="Estado" validationState="success" helperText="Verificado el 12/03">
        <Select value="activo" onValueChange={() => undefined} ariaLabel="Estado">
          <SelectItem value="activo">Activo</SelectItem>
        </Select>
      </FormField>
    </Stack>
  ),
  code: `import { FormField, Input } from '@danielitouci96/design-system';

<FormField
  label="Nombre del protocolo"
  htmlFor="nombre"
  required
  helperText="Máx. 80 caracteres"
>
  <Input id="nombre" />
</FormField>

<FormField label="Centro" errorMessage="Este centro ya está asignado">
  <Input validationState="error" />
</FormField>`,
  api: [
    { name: 'label', type: 'ReactNode', description: 'Etiqueta del campo. asChild enlaza el control automáticamente.' },
    { name: 'htmlFor / id', type: 'string', description: 'Relación explícita entre etiqueta y control.' },
    { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marca el asterisco y el atributo required.' },
    { name: 'description / helperText', type: 'ReactNode', description: 'Ayuda bajo el campo.' },
    { name: 'errorMessage', type: 'ReactNode', description: 'Error; pone el campo en estado error automáticamente.' },
    { name: 'validationState', type: "'default' | 'error' | 'success' | 'warning'", defaultValue: "'default'", description: 'Estado visual del campo.' },
    { name: 'orientation', type: "'vertical' | 'horizontal'", defaultValue: "'vertical'", description: 'Disposición de etiqueta y control.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Input                                                               */
/* ------------------------------------------------------------------ */

const inputEntry: ShowcaseEntry = {
  id: 'input',
  name: 'Input',
  category: 'Formularios',
  description:
    'Campo de texto de una línea. Extiende las props nativas de input, así que type, placeholder, value y onChange funcionan como esperas.',
  preview: (
    <Stack gap={4}>
      <Input placeholder="Nombre del participante" aria-label="Nombre" />
      <Input placeholder="Con error" validationState="error" defaultValue="abc" />
      <Input placeholder="Correcto" validationState="success" defaultValue="ONCO-01" />
      <Inline gap={3} wrap>
        <Input size="sm" placeholder="sm" />
        <Input size="md" placeholder="md" />
        <Input size="lg" placeholder="lg" />
      </Inline>
      <Input placeholder="Ancho completo" fullWidth />
    </Stack>
  ),
  code: `import { Input } from '@danielitouci96/design-system';

<Input placeholder="Nombre del participante" />
<Input validationState="error" defaultValue="abc" />
<Input size="lg" fullWidth />`,
  api: [
    { name: 'validationState', type: "'default' | 'error' | 'success' | 'warning'", defaultValue: "'default'", description: 'Estado visual; normalmente lo pone FormField.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Altura del campo.' },
    { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Ocupa todo el ancho.' },
    { name: '…props nativas', type: 'InputHTMLAttributes', description: 'type, placeholder, value, onChange, disabled, name…' },
  ],
};

/* ------------------------------------------------------------------ */
/* Textarea                                                            */
/* ------------------------------------------------------------------ */

const textareaEntry: ShowcaseEntry = {
  id: 'textarea',
  name: 'Textarea',
  category: 'Formularios',
  description:
    'Campo de texto multilínea. resize controla si el usuario puede estirar la caja.',
  preview: (
    <Stack gap={4}>
      <Textarea placeholder="Notas del protocolo" rows={3} />
      <Textarea placeholder="No redimensionable" rows={2} resize="none" />
      <Textarea placeholder="Con error" validationState="error" rows={2} />
    </Stack>
  ),
  code: `import { Textarea } from '@danielitouci96/design-system';

<Textarea placeholder="Notas del protocolo" rows={3} />
<Textarea resize="none" rows={2} />`,
  api: [
    { name: 'validationState', type: "'default' | 'error' | 'success' | 'warning'", defaultValue: "'default'", description: 'Estado visual.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Tamaño del texto.' },
    { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", defaultValue: "'vertical'", description: 'Permitir redimensionar la caja.' },
    { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Ocupa todo el ancho.' },
  ],
};

/* ------------------------------------------------------------------ */
/* PasswordInput                                                       */
/* ------------------------------------------------------------------ */

const passwordEntry: ShowcaseEntry = {
  id: 'password-input',
  name: 'PasswordInput',
  category: 'Formularios',
  description:
    'Campo de contraseña con botón de mostrar/ocultar. Es un Input con type="password" y el icono de visibilidad ya resueltos.',
  preview: (
    <Stack gap={4}>
      <PasswordInput placeholder="Contraseña" aria-label="Contraseña" />
      <PasswordInput placeholder="Con error" validationState="error" />
    </Stack>
  ),
  code: `import { PasswordInput } from '@danielitouci96/design-system';

<PasswordInput placeholder="Contraseña" />
<PasswordInput validationState="error" />`,
  api: [
    { name: '…props de Input', type: 'Omit<InputProps, "type">', description: 'Todas menos type, que lo controla el componente.' },
  ],
};

/* ------------------------------------------------------------------ */
/* SearchInput                                                         */
/* ------------------------------------------------------------------ */

function SearchDemo() {
  const [texto, setTexto] = React.useState('');
  return (
    <Stack gap={3}>
      <SearchInput
        value={texto}
        onSearchChange={setTexto}
        placeholder="Buscar participantes…"
        aria-label="Buscar participantes"
      />
      <Text size="sm" tone="secondary">
        Valor: <strong>{texto || '—'}</strong>
      </Text>
    </Stack>
  );
}

const searchEntry: ShowcaseEntry = {
  id: 'search-input',
  name: 'SearchInput',
  category: 'Formularios',
  description:
    'Campo de búsqueda con icono y debounce. onSearchChange se dispara en cada tecla; onSearch, al terminar el debounce.',
  preview: () => <SearchDemo />,
  code: `import { SearchInput } from '@danielitouci96/design-system';

<SearchInput
  value={busqueda}
  onSearchChange={setBusqueda}
  placeholder="Buscar participantes…"
  debounceMs={300}
/>`,
  api: [
    { name: 'onSearchChange', type: '(value: string) => void', description: 'En cada cambio, sin debounce.' },
    { name: 'onSearch', type: '(value: string) => void', description: 'Tras el debounce: para llamadas al servidor.' },
    { name: 'debounceMs', type: 'number', defaultValue: '300', description: 'Espera antes de onSearch.' },
    { name: 'placeholder / icon', type: 'string / IconName', description: 'Texto e icono del campo.' },
  ],
};

/* ------------------------------------------------------------------ */
/* NumberInput                                                         */
/* ------------------------------------------------------------------ */

function NumberDemo() {
  const [valor, setValor] = React.useState<number | ''>(14);
  return (
    <Stack gap={3}>
      <NumberInput value={valor} onValueChange={setValor} min={0} max={500} step={2} placeholder="Participantes" />
      <Text size="sm" tone="secondary">
        Valor: <strong>{valor === '' ? 'vacío' : valor}</strong> (0–500, paso 2)
      </Text>
    </Stack>
  );
}

const numberEntry: ShowcaseEntry = {
  id: 'number-input',
  name: 'NumberInput',
  category: 'Formularios',
  description:
    'Campo numérico con límites y paso. Admite estado vacío, así que distingue "0" de "sin rellenar".',
  preview: () => <NumberDemo />,
  code: `import { NumberInput } from '@danielitouci96/design-system';

<NumberInput
  value={valor}
  onValueChange={setValor}
  min={0}
  max={500}
  step={2}
  placeholder="Participantes"
/>`,
  api: [
    { name: 'value', type: "number | ''", description: 'Incluye vacío para poder borrar todo.' },
    { name: 'onValueChange', type: "(value: number | '') => void", description: "Devuelve cadena vacía cuando se borra todo." },
    { name: 'min / max / step', type: 'number', description: 'Límites y incremento de los controles.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Select                                                              */
/* ------------------------------------------------------------------ */

function SelectDemo() {
  const [valor, setValor] = React.useState('cardio');
  const [otro, setOtro] = React.useState('a');
  return (
    <Stack gap={4}>
      <Select value={valor} onValueChange={setValor} ariaLabel="Marca" size="md">
        <SelectItem value="grove">Tema Grove · verde</SelectItem>
        <SelectItem value="onco">Tema Onco · azul</SelectItem>
        <SelectItem value="cardio">Tema Cardio · violeta</SelectItem>
      </Select>
      <Select
        value={otro}
        onValueChange={setOtro}
        validationState="error"
        ariaLabel="Con error"
        size="md"
      >
        <SelectItem value="a">Opción A</SelectItem>
        <SelectItem value="b">Opción B</SelectItem>
      </Select>
      <Text size="sm" tone="secondary">
        Seleccionado: <strong>{valor}</strong>
      </Text>
    </Stack>
  );
}

const selectEntry: ShowcaseEntry = {
  id: 'select',
  name: 'Select',
  category: 'Formularios',
  description:
    'Desplegable de una sola opción. Se compone con SelectItem como hijos; el estado se controla con value/onValueChange.',
  preview: () => <SelectDemo />,
  code: `import { Select, SelectItem } from '@danielitouci96/design-system';

<Select value={marca} onValueChange={setMarca} ariaLabel="Marca">
  <SelectItem value="grove">Tema Grove</SelectItem>
  <SelectItem value="onco">Tema Onco</SelectItem>
</Select>`,
  api: [
    { name: 'value / onValueChange', type: 'string / (value: string) => void', description: 'Control del valor seleccionado.' },
    { name: 'placeholder', type: 'string', description: 'Texto cuando no hay valor.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Altura del control.' },
    { name: 'validationState', type: "'default' | 'error' | 'success' | 'warning'", defaultValue: "'default'", description: 'Estado visual.' },
    { name: 'ariaLabel', type: 'string', description: 'Nombre accesible; el placeholder no basta.' },
  ],
};

/* ------------------------------------------------------------------ */
/* MultiSelect                                                         */
/* ------------------------------------------------------------------ */

const PAISES = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
];

function MultiSelectDemo() {
  const [sel, setSel] = React.useState<string[]>(['es', 'mx']);
  return (
    <Stack gap={3}>
      <MultiSelect
        options={PAISES}
        value={sel}
        onChange={setSel}
        placeholder="Selecciona países"
        ariaLabel="Países"
      />
      <Text size="sm" tone="secondary">
        Seleccionados: <strong>{sel.length ? sel.join(', ') : 'ninguno'}</strong>
      </Text>
    </Stack>
  );
}

const multiSelectEntry: ShowcaseEntry = {
  id: 'multi-select',
  name: 'MultiSelect',
  category: 'Formularios',
  description:
    'Selección múltiple. El valor es un array de strings; onChange entrega el array completo, no el elemento pulsado.',
  preview: () => <MultiSelectDemo />,
  code: `import { MultiSelect } from '@danielitouci96/design-system';

const paises = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];

<MultiSelect
  options={paises}
  value={seleccionados}
  onChange={setSeleccionados}
  placeholder="Selecciona países"
/>`,
  api: [
    { name: 'options', type: '{ value: string; label: ReactNode; disabled?: boolean }[]', description: 'Obligatorio. Opciones del desplegable.' },
    { name: 'value / onChange', type: 'string[] / (next: string[]) => void', description: 'Selección controlada.' },
    { name: 'maxHeight', type: 'number', description: 'Alto máximo de la lista antes de hacer scroll.' },
    { name: 'placeholder / ariaLabel', type: 'string', description: 'Texto inicial y nombre accesible.' },
  ],
  floatingPreview: true,
};

/* ------------------------------------------------------------------ */
/* Combobox                                                            */
/* ------------------------------------------------------------------ */

const MEDICOS = [
  { value: 'vazquez', label: 'Dra. Elena Vázquez' },
  { value: 'lopez', label: 'Dr. Javier López' },
  { value: 'ruiz', label: 'Dra. Sofía Ruiz' },
  { value: 'mora', label: 'Dr. Andrés Mora' },
];

function ComboboxDemo() {
  const [busqueda, setBusqueda] = React.useState('');
  const [elegido, setElegido] = React.useState<string | null>(null);
  const filtradas = MEDICOS.filter((m) => m.label.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <Stack gap={3}>
      <Combobox
        options={filtradas}
        value={busqueda}
        onValueChange={setBusqueda}
        onSelect={(o) => {
          setElegido(o.value);
          setBusqueda(o.label);
        }}
        placeholder="Busca un médico…"
        openOnFocus
        clearOnSelect
      />
      <Text size="sm" tone="secondary">
        Elegido: <strong>{elegido ?? 'ninguno'}</strong>
      </Text>
    </Stack>
  );
}

const comboboxEntry: ShowcaseEntry = {
  id: 'combobox',
  name: 'Combobox',
  category: 'Formularios',
  description:
    'Búsqueda con sugerencias. A diferencia de Select, el usuario puede escribir: úsalo cuando el conjunto es grande o desconocido.',
  preview: () => <ComboboxDemo />,
  code: `import { Combobox } from '@danielitouci96/design-system';

<Combobox
  options={medicos}
  value={busqueda}
  onValueChange={setBusqueda}
  onSelect={(opcion) => setMedico(opcion.value)}
  placeholder="Busca un médico…"
  openOnFocus
  clearOnSelect
/>`,
  api: [
    { name: 'options', type: '{ value: string; label: string; disabled?: boolean }[]', description: 'Obligatorio. Opciones mostradas.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'El usuario escribió algo: úsalo para filtrar en remoto.' },
    { name: 'onSelect', type: '(option: ComboboxOption) => void', description: 'El usuario eligió una opción.' },
    { name: 'openOnFocus', type: 'boolean', defaultValue: 'false', description: 'Abre la lista al recibir el foco.' },
    { name: 'clearOnSelect', type: 'boolean', defaultValue: 'false', description: 'Limpia el texto tras elegir.' },
  ],
  floatingPreview: true,
};

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */

function CheckboxDemo() {
  const [aceptado, setAceptado] = React.useState<boolean | 'indeterminate'>(false);
  return (
    <Stack gap={3}>
      <Checkbox
        checked={aceptado}
        onCheckedChange={setAceptado}
        label="Acepto el consentimiento informado"
      />
      <Checkbox checked="indeterminate" label="Selección parcial" />
      <Checkbox checked label="Marcado" />
      <Checkbox disabled label="Deshabilitado" />
      <Text size="sm" tone="secondary">
        Estado: <strong>{aceptado === 'indeterminate' ? 'parcial' : String(aceptado)}</strong>
      </Text>
    </Stack>
  );
}

const checkboxEntry: ShowcaseEntry = {
  id: 'checkbox',
  name: 'Checkbox',
  category: 'Formularios',
  description:
    'Selección múltiple o opción booleana. checked admite "indeterminate" para cuando solo parte de un grupo está marcada.',
  preview: () => <CheckboxDemo />,
  code: `import { Checkbox } from '@danielitouci96/design-system';

<Checkbox
  checked={aceptado}
  onCheckedChange={setAceptado}
  label="Acepto el consentimiento informado"
/>

<Checkbox checked="indeterminate" label="Selección parcial" />`,
  api: [
    { name: 'checked', type: "boolean | 'indeterminate'", description: 'Estado controlado.' },
    { name: 'onCheckedChange', type: "(checked: boolean | 'indeterminate') => void", description: 'Cambio; incluye el estado indeterminado.' },
    { name: 'defaultChecked', type: 'boolean', description: 'Estado inicial sin control.' },
    { name: 'label', type: 'ReactNode', description: 'Etiqueta asociada; también puede ir como hijo.' },
    { name: 'validationState / size / disabled', type: '—', description: 'Estado visual, tamaño y bloqueo.' },
  ],
};

/* ------------------------------------------------------------------ */
/* RadioGroup                                                          */
/* ------------------------------------------------------------------ */

function RadioDemo() {
  const [v, setV] = React.useState('amostral');
  return (
    <Stack gap={3}>
      <RadioGroup
        value={v}
        onValueChange={setV}
        label="Tipo de muestreo"
        name="muestreo"
        items={[
          { value: 'amostral', label: 'Amostral' },
          { value: 'aleatorio', label: 'Aleatorio' },
          { value: 'censal', label: 'Censal', disabled: true },
        ]}
      />
      <Text size="sm" tone="secondary">
        Elegido: <strong>{v}</strong>
      </Text>
    </Stack>
  );
}

const radioEntry: ShowcaseEntry = {
  id: 'radio-group',
  name: 'RadioGroup',
  category: 'Formularios',
  description:
    'Grupo de opciones mutuamente excluyentes. Se declara con items; name es obligatorio para que el teclado y los lectores de pantalla agrupen bien.',
  preview: () => <RadioDemo />,
  code: `import { RadioGroup } from '@danielitouci96/design-system';

<RadioGroup
  value={muestreo}
  onValueChange={setMuestreo}
  label="Tipo de muestreo"
  name="muestreo"
  items={[
    { value: 'amostral', label: 'Amostral' },
    { value: 'aleatorio', label: 'Aleatorio' },
  ]}
/>`,
  api: [
    { name: 'items', type: 'RadioItemProps[]', description: 'Obligatorio. value y label de cada opción.' },
    { name: 'value / onValueChange', type: 'string / (value: string) => void', description: 'Opción seleccionada.' },
    { name: 'name', type: 'string', description: 'Nombre del grupo; agrupa para accesibilidad.' },
    { name: 'orientation', type: "'vertical' | 'horizontal'", defaultValue: "'vertical'", description: 'Disposición de las opciones.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Switch                                                              */
/* ------------------------------------------------------------------ */

function SwitchDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <Stack gap={3}>
      <Switch checked={on} onCheckedChange={setOn} label="Sincronización automática" />
      <Switch defaultChecked={false} label="Enviar informe semanal" />
      <Switch disabled label="Bloqueado por política" />
      <Text size="sm" tone="secondary">
        Estado: <strong>{on ? 'activado' : 'desactivado'}</strong>
      </Text>
    </Stack>
  );
}

const switchEntry: ShowcaseEntry = {
  id: 'switch',
  name: 'Switch',
  category: 'Formularios',
  description:
    'Interruptor para un ajuste que aplica al instante. Si la acción necesita un botón "Guardar", usa Checkbox.',
  preview: () => <SwitchDemo />,
  code: `import { Switch } from '@danielitouci96/design-system';

<Switch
  checked={activo}
  onCheckedChange={setActivo}
  label="Sincronización automática"
/>`,
  api: [
    { name: 'checked / onCheckedChange', type: 'boolean / (checked: boolean) => void', description: 'Estado controlado.' },
    { name: 'defaultChecked', type: 'boolean', description: 'Estado inicial sin control.' },
    { name: 'label', type: 'ReactNode', description: 'Etiqueta asociada.' },
    { name: 'size / validationState / disabled', type: '—', description: 'Tamaño, estado visual y bloqueo.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Slider                                                              */
/* ------------------------------------------------------------------ */

function SliderDemo() {
  const [valor, setValor] = React.useState<number[]>([40, 80]);
  return (
    <Stack gap={4}>
      <Slider value={valor} onValueChange={setValor} min={0} max={100} step={5} ariaLabel="Adherencia" />
      <Text size="sm" tone="secondary">
        Rango: <strong>{valor[0]} – {valor[1]}</strong>
      </Text>
    </Stack>
  );
}

const sliderEntry: ShowcaseEntry = {
  id: 'slider',
  name: 'Slider',
  category: 'Formularios',
  description:
    'Control deslizante. El valor siempre es un array, incluso con un solo pulgar, para que la API no cambie.',
  preview: () => <SliderDemo />,
  code: `import { Slider } from '@danielitouci96/design-system';

<Slider
  value={rango}
  onValueChange={setRango}
  min={0}
  max={100}
  step={5}
  ariaLabel="Adherencia"
/>`,
  api: [
    { name: 'value / onValueChange', type: 'number[] / (value: number[]) => void', description: 'Valor(es) de los pulgares.' },
    { name: 'min / max / step', type: 'number', description: 'Rango e incremento.' },
    { name: 'minStepsBetweenThumbs', type: 'number', description: 'Separación mínima entre pulgares.' },
    { name: 'ariaLabel', type: 'string', description: 'Nombre accesible del control.' },
  ],
};

export const FORMULARIOS: ShowcaseEntry[] = [
  formFieldEntry,
  inputEntry,
  textareaEntry,
  passwordEntry,
  searchEntry,
  numberEntry,
  selectEntry,
  multiSelectEntry,
  comboboxEntry,
  checkboxEntry,
  radioEntry,
  switchEntry,
  sliderEntry,
];
