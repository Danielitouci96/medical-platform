import * as React from 'react';
import classNames from 'classnames';
import type { ButtonVariant, ButtonSize } from '../Button/Button';
import { Icon, type IconName, type IconSize } from '../../icons/Icon';
import { Spinner } from '../Spinner/Spinner';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon name from the design system icon set. */
  icon: IconName;
  /** Accessible label (required for icon-only buttons). */
  'aria-label': string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'ghost', size = 'md', loading, disabled, className, ...rest },
  ref,
) {
  const iconSizeByButtonSize: Record<ButtonSize, IconSize> = {
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'md',
  };

  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        'med-icon-button',
        `med-button--variant-${variant}`,
        `med-icon-button--size-${size}`,
        loading && 'med-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Spinner size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} aria-hidden="true" />
      ) : (
        <Icon name={icon} size={iconSizeByButtonSize[size]} aria-hidden="true" />
      )}
    </button>
  );
});

export { IconButton };
export default IconButton;