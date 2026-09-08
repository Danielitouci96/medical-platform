import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName, type IconSize } from '../../icons/Icon';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. */
  variant?: ButtonVariant;
  /** Size. */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  iconLeft?: IconName;
  /** Icon rendered after the label. */
  iconRight?: IconName;
  /** Makes the button take the full width of its container. */
  fullWidth?: boolean;
  /** Shows a loading spinner and disables the button. */
  loading?: boolean;
  /** Disables the button. */
  disabled?: boolean;
  /** Visually renders as an anchor when `asChild` is not used. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth,
    loading,
    disabled,
    asChild,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const iconSizeByButtonSize: Record<ButtonSize, IconSize> = {
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'md',
  };

  const classes = classNames(
    'med-button',
    `med-button--variant-${variant}`,
    `med-button--size-${size}`,
    fullWidth && 'med-button--full-width',
    loading && 'med-button--loading',
    className,
  );

  const iconSize = iconSizeByButtonSize[size];

  const content = (
    <>
      {loading ? (
        <Spinner size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} aria-hidden="true" />
      ) : iconLeft ? (
        <Icon name={iconLeft} size={iconSize} aria-hidden="true" />
      ) : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={iconSize} aria-hidden="true" /> : null}
    </>
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string; 'aria-disabled'?: boolean | undefined }>,
      {
        className: classes,
        'aria-disabled': disabled || loading || undefined,
      },
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
});

export { Button };
export default Button;