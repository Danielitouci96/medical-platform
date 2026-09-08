import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export type ChipVariant = 'default' | 'outline' | 'filter';
export type ChipSize = 'sm' | 'md';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  icon?: IconName;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { variant = 'default', size = 'md', selected, icon, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected ?? undefined}
      className={classNames(
        'med-chip',
        `med-chip--variant-${variant}`,
        `med-chip--size-${size}`,
        selected && 'med-chip--selected',
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size="xs" aria-hidden="true" /> : null}
      {children}
    </button>
  );
});

export { Chip };
export default Chip;