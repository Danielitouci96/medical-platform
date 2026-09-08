import * as React from 'react';
import { DatePicker } from '../DatePicker/DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';

export interface DateTimeValue {
  date: string | null;
  time: string | null;
}

export interface DateTimePickerProps {
  value?: DateTimeValue;
  onValueChange?: (value: DateTimeValue) => void;
  disabled?: boolean;
  dateLabel?: string;
  timeLabel?: string;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(function DateTimePicker(
  { value, onValueChange, disabled, dateLabel = 'Date', timeLabel = 'Time' },
  ref,
) {
  return (
    <div ref={ref} className="med-datetime-picker">
      <DatePicker
        value={value?.date ?? ''}
        onValueChange={(date) => onValueChange?.({ date, time: value?.time ?? null })}
        disabled={disabled}
        label={dateLabel}
        ariaLabel={dateLabel}
      />
      <TimePicker
        value={value?.time ?? ''}
        onValueChange={(time) => onValueChange?.({ date: value?.date ?? null, time })}
        disabled={disabled}
        ariaLabel={timeLabel}
      />
    </div>
  );
});

export { DateTimePicker };
export default DateTimePicker;