import * as React from 'react';
import { Input } from '../Input/Input';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Popover/Popover';
import { Calendar } from '../Calendar/Calendar';
import type { InputSize } from '../Input/Input';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function toDate(value?: string | Date | null): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (ISO_DATE.test(value)) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}

export interface DatePickerProps {
  value?: string | Date;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
  label?: string;
  ariaLabel?: string;
  disabledDates?: (date: Date) => boolean;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    onValueChange,
    placeholder = 'Pick a date',
    disabled,
    size,
    label,
    ariaLabel,
    disabledDates,
  },
  ref,
) {
  const selectedDate = toDate(value);
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const commitText = (raw: string) => {
    setText(raw);
    if (ISO_DATE.test(raw)) {
      onValueChange?.(raw);
    }
  };

  return (
    <div ref={ref} className="med-date-picker">
      <Popover
        open={open}
        onOpenChange={setOpen}
        align="start"
        trigger={
          <div className="med-date-picker__trigger">
            <Input
              type="text"
              value={text || (selectedDate ? toIso(selectedDate) : '')}
              onChange={(e) => commitText(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              size={size}
              aria-label={ariaLabel ?? label}
              readOnly={false}
            />
            {!disabled ? (
              <IconButton
                icon="Calendar"
                aria-label="Open calendar"
                size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
                variant="ghost"
                onClick={() => setOpen(true)}
                className="med-date-picker__toggle"
              />
            ) : null}
          </div>
        }
      >
        <Calendar
          selectedDate={selectedDate}
          onSelect={(d) => {
            onValueChange?.(toIso(d));
            setText('');
            setOpen(false);
          }}
          disabledDates={disabledDates}
        />
      </Popover>
    </div>
  );
});

function toIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export { DatePicker };
export default DatePicker;