import * as React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import classNames from 'classnames';

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  minStepsBetweenThumbs?: number;
  ariaLabel?: string;
  className?: string;
}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  {
    value,
    defaultValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    minStepsBetweenThumbs,
    ariaLabel,
    className,
  },
  ref,
) {
  return (
    <RadixSlider.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      className={classNames('med-slider', className)}
      aria-label={ariaLabel}
    >
      <RadixSlider.Track className="med-slider__track">
        <RadixSlider.Range className="med-slider__range" />
      </RadixSlider.Track>
      {(value ?? defaultValue ?? [min]).map((_, i) => (
        <RadixSlider.Thumb key={i} className="med-slider__thumb" />
      ))}
    </RadixSlider.Root>
  );
});

export { Slider };
export default Slider;