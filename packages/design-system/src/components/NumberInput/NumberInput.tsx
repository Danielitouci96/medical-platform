import * as React from 'react';
import { Input, type InputProps } from '../Input/Input';

export interface NumberInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
  value?: number | '';
  onValueChange?: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { value, onValueChange, min, max, step = 1, ...rest },
  ref,
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      onValueChange?.('');
      return;
    }
    const n = Number(raw);
    if (Number.isNaN(n)) return;
    onValueChange?.(n);
  };

  return (
    <Input
      ref={ref}
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      {...rest}
    />
  );
});

export { NumberInput };
export default NumberInput;