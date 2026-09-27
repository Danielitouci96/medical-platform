import * as React from 'react';
import {
  Calendar,
  DatePicker,
  DateRangePicker,
  TimePicker,
  DateTimePicker,
  Stack,
  Text,
} from '@danielitouci96/design-system';
import type { DateRangeValue, DateTimeValue } from '@danielitouci96/design-system';
import type { ShowcaseEntry } from '../types';

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

function CalendarDemo() {
  const [sel, setSel] = React.useState<Date | undefined>(new Date(2026, 2, 12));
  return (
    <Stack gap={3}>
      <Calendar
        selectedDate={sel}
        onSelect={setSel}
        weeks={1}
        disabledDates={(d) => d.getDay() === 0}
      />
      <Text size="sm" tone="secondary">
        Seleccionado: <strong>{sel ? sel.toLocaleDateString('es-ES') : '—'}</strong> · los
        domingos están deshabilitados
      </Text>
    </Stack>
  );
}

const calendarEntry: ShowcaseEntry = {
  id: 'calendar',
  name: 'Calendar',
  category: 'Formularios',
  description:
    'Rejilla de días para elegir una fecha. Es la base de los pickers; úsala directa cuando quieres el calendario siempre visible.',
  preview: () => <CalendarDemo />,
  code: `import { Calendar } from '@danielitouci96/design-system';

<Calendar
  selectedDate={fecha}
  onSelect={setFecha}
  weeks={1}
  disabledDates={(d) => d.getDay() === 0}
/>`,
  api: [
    { name: 'selectedDate', type: 'Date', description: 'Día marcado como seleccionado.' },
    { name: 'onSelect', type: '(date: Date) => void', description: 'Pulsación sobre un día.' },
    { name: 'rangeStart / rangeEnd', type: 'Date | null', description: 'Para seleccionar un rango en vez de un día.' },
    { name: 'weeks', type: 'number', defaultValue: '1', description: 'Cuántas semanas se pintan.' },
    { name: 'disabledDates', type: '(date: Date) => boolean', description: 'Qué días no se pueden elegir.' },
  ],
};

/* ------------------------------------------------------------------ */
/* DatePicker                                                          */
/* ------------------------------------------------------------------ */

function DatePickerDemo() {
  const [v, setV] = React.useState<string | Date | undefined>('2026-03-12');
  return (
    <Stack gap={3}>
      <DatePicker
        value={v}
        onValueChange={(next) => setV(next ?? undefined)}
        placeholder="Fecha de inicio"
        size="md"
        disabledDates={(d) => d.getDay() === 0}
      />
      <Text size="sm" tone="secondary">
        Valor: <strong>{typeof v === 'string' ? v : v ? v.toLocaleDateString('es-ES') : 'vacío'}</strong>{' '}
        (formato ISO)
      </Text>
    </Stack>
  );
}

const datePickerEntry: ShowcaseEntry = {
  id: 'date-picker',
  name: 'DatePicker',
  category: 'Formularios',
  description:
    'Campo de fecha con calendario desplegable. El valor es un string ISO, no un Date: es lo que se envía al servidor.',
  preview: () => <DatePickerDemo />,
  code: `import { DatePicker } from '@danielitouci96/design-system';

<DatePicker
  value={fecha}
  onValueChange={setFecha}
  placeholder="Fecha de inicio"
  disabledDates={(d) => d.getDay() === 0}
/>`,
  api: [
    { name: 'value', type: 'string | Date', description: 'Fecha como ISO (yyyy-mm-dd) o Date.' },
    { name: 'onValueChange', type: '(value: string | null) => void', description: 'Devuelve null al limpiar.' },
    { name: 'placeholder', type: 'string', description: 'Texto cuando no hay fecha.' },
    { name: 'disabledDates', type: '(date: Date) => boolean', description: 'Días no seleccionables.' },
    { name: 'size / disabled / label / ariaLabel', type: '—', description: 'Igual que en el resto de campos.' },
  ],
  floatingPreview: true,
};

/* ------------------------------------------------------------------ */
/* DateRangePicker                                                     */
/* ------------------------------------------------------------------ */

function DateRangeDemo() {
  const [v, setV] = React.useState<DateRangeValue | undefined>({
    start: '2026-03-01',
    end: '2026-03-31',
  });
  return (
    <Stack gap={3}>
      <DateRangePicker
        value={v}
        onValueChange={setV}
        placeholder="Rango de fechas"
      />
      <Text size="sm" tone="secondary">
        Rango: <strong>{v?.start && v?.end ? `${v.start} → ${v.end}` : 'vacío'}</strong>
      </Text>
    </Stack>
  );
}

const dateRangeEntry: ShowcaseEntry = {
  id: 'date-range-picker',
  name: 'DateRangePicker',
  category: 'Formularios',
  description:
    'Campo de rango de fechas. El valor es { start, end } con ambos extremos en ISO.',
  preview: () => <DateRangeDemo />,
  code: `import { DateRangePicker } from '@danielitouci96/design-system';

<DateRangePicker
  value={rango}
  onValueChange={setRango}
  placeholder="Rango de fechas"
/>`,
  api: [
    { name: 'value', type: '{ start: string; end: string } | undefined', description: 'Extremos del rango en ISO.' },
    { name: 'onValueChange', type: '(value) => void', description: 'Cambio del rango; undefined si se limpia.' },
    { name: 'placeholder', type: 'string', description: 'Texto inicial.' },
  ],
  floatingPreview: true,
};

/* ------------------------------------------------------------------ */
/* TimePicker                                                          */
/* ------------------------------------------------------------------ */

function TimeDemo() {
  const [v, setV] = React.useState<string | undefined>('09:30');
  return (
    <Stack gap={3}>
      <TimePicker value={v} onValueChange={(next) => setV(next ?? undefined)} ariaLabel="Hora de la visita" />
      <Text size="sm" tone="secondary">
        Hora: <strong>{v ?? '—'}</strong> (HH:mm, 24 h)
      </Text>
    </Stack>
  );
}

const timeEntry: ShowcaseEntry = {
  id: 'time-picker',
  name: 'TimePicker',
  category: 'Formularios',
  description:
    'Campo de hora en formato 24 h. El valor es un string "HH:mm", no un objeto Date.',
  preview: () => <TimeDemo />,
  code: `import { TimePicker } from '@danielitouci96/design-system';

<TimePicker value={hora} onValueChange={setHora} ariaLabel="Hora de la visita" />`,
  api: [
    { name: 'value', type: 'string', description: 'Hora en HH:mm.' },
    { name: 'onValueChange', type: '(value: string | null) => void', description: 'Devuelve null al limpiar.' },
    { name: 'ariaLabel', type: 'string', description: 'Nombre accesible; no hay etiqueta visible por defecto.' },
  ],
};

/* ------------------------------------------------------------------ */
/* DateTimePicker                                                      */
/* ------------------------------------------------------------------ */

function DateTimeDemo() {
  const [v, setV] = React.useState<DateTimeValue | undefined>({
    date: '2026-03-12',
    time: '09:30',
  });
  return (
    <Stack gap={3}>
      <DateTimePicker
        value={v}
        onValueChange={setV}
        dateLabel="Fecha"
        timeLabel="Hora"
      />
      <Text size="sm" tone="secondary">
        Combinado: <strong>{v?.date && v?.time ? `${v.date} ${v.time}` : 'vacío'}</strong>
      </Text>
    </Stack>
  );
}

const dateTimeEntry: ShowcaseEntry = {
  id: 'date-time-picker',
  name: 'DateTimePicker',
  category: 'Formularios',
  description:
    'Los dos campos juntos, para agendar una visita. Evita dos controles sueltos cuando siempre van emparejados.',
  preview: () => <DateTimeDemo />,
  code: `import { DateTimePicker } from '@danielitouci96/design-system';

<DateTimePicker
  value={visita}
  onValueChange={setVisita}
  dateLabel="Fecha"
  timeLabel="Hora"
/>`,
  api: [
    { name: 'value', type: '{ date: string; time: string } | undefined', description: 'Fecha ISO y hora HH:mm.' },
    { name: 'onValueChange', type: '(value) => void', description: 'Cambio de cualquiera de los dos campos.' },
    { name: 'dateLabel / timeLabel', type: 'string', description: 'Etiquetas visibles de cada campo.' },
  ],
};

export const FECHAS: ShowcaseEntry[] = [
  calendarEntry,
  datePickerEntry,
  dateRangeEntry,
  timeEntry,
  dateTimeEntry,
];
