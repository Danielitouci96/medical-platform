import * as React from 'react';
import { Input } from '../Input/Input';

export interface TimePickerProps {
  value?: string; // HH:mm
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
  { value, onValueChange, disabled, ariaLabel = 'Time' },
  ref,
) {
  return (
    <Input
      ref={ref}
      type="time"
      value={value ?? ''}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => {
        const v = e.target.value;
        if (TIME_RE.test(v)) onValueChange?.(v);
      }}
    />
  );
});

export { TimePicker };
export default TimePicker;