import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName, type IconSize } from '../../icons/Icon';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeVariant = 'soft' | 'solid' | 'outline';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconName;
  /** Dot indicator that conveys state without relying solely on color. */
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', variant = 'soft', size = 'md', icon, dot, className, children, ...rest },
  ref,
) {
  const iconSize: IconSize = size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : 'sm';

  return (
    <span
      ref={ref}
      className={classNames(
        'med-badge',
        `med-badge--tone-${tone}`,
        `med-badge--variant-${variant}`,
        `med-badge--size-${size}`,
        className,
      )}
      {...rest}
    >
      {dot ? <span className="med-badge__dot" aria-hidden="true" /> : null}
      {icon ? <Icon name={icon} size={iconSize} aria-hidden="true" /> : null}
      {children}
    </span>
  );
});

export { Badge };
export default Badge;