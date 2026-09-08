import * as React from 'react';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';
import { Popover } from '../Popover/Popover';
import { Calendar } from '../Calendar/Calendar';

export interface DateRangeValue {
  start: string | null;
  end: string | null;
}

export interface DateRangePickerProps {
  value?: DateRangeValue;
  onValueChange?: (value: DateRangeValue) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
}

const toIso = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(function DateRangePicker(
  { value, onValueChange, placeholder = 'Select date range', disabled, label, ariaLabel },
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const start = value?.start ?? pending.start ? (pending.start && toIso(pending.start)) : null;
  const end = value?.end ?? pending.end ? (pending.end && toIso(pending.end)) : null;

  const displayText = start && end ? `${start} – ${end}` : start ? `${start} – …` : placeholder;

  const handleSelect = (date: Date) => {
    setPending((p) => {
      let next = { ...p };
      if (!p.start || (p.start && p.end)) {
        next = { start: date, end: null };
      } else if (date >= p.start) {
        next = { start: p.start, end: date };
      } else {
        next = { start: date, end: p.start };
      }
      if (next.start && next.end) {
        onValueChange?.({ start: toIso(next.start), end: toIso(next.end) });
        setOpen(false);
      }
      return next;
    });
  };

  return (
    <div ref={ref} className="med-range-picker">
      <Popover
        open={open}
        onOpenChange={setOpen}
        align="start"
        trigger={
          <button
            type="button"
            disabled={disabled}
            className="med-range-picker__trigger"
            onClick={() => setOpen(true)}
            aria-label={ariaLabel ?? label}
          >
            <Icon name="Calendar" size="sm" aria-hidden="true" />
            <span className={classNames('med-range-picker__text', !start && 'med-range-picker__text--placeholder')}>
              {displayText}
            </span>
          </button>
        }
      >
        <div className="med-range-picker__calendars">
          <Calendar
            rangeStart={pending.start}
            rangeEnd={pending.end}
            onSelect={handleSelect}
          />
        </div>
        <div className="med-range-picker__actions">
          <button
            type="button"
            onClick={() => {
              setPending({ start: null, end: null });
              onValueChange?.({ start: null, end: null });
              setOpen(false);
            }}
          >
            Clear
          </button>
        </div>
      </Popover>
    </div>
  );
});

export { DateRangePicker };
export default DateRangePicker;