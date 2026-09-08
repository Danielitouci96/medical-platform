import * as React from 'react';
import classNames from 'classnames';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'name'> {
  /** Name of the Lucide icon to render. */
  name?: IconName;
  /** A Lucide icon component (icon node) to render directly. */
  icon?: React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
  /** Icon size. */
  size?: IconSize | number;
  /** Accessible label (rendered as aria-hidden when omitted). */
  label?: string;
  /** Current tone / color. */
  color?: React.CSSProperties['color'];
}

const sizeMap: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, icon, size = 'md', label, color, className, 'aria-hidden': ariaHidden, ...rest },
  ref,
) {
  const LucideIcon = (icon ??
    (name ? (LucideIcons[name] as React.ComponentType<React.SVGAttributes<SVGSVGElement>> | undefined) : undefined)) as
    | React.ForwardRefExoticComponent<React.SVGAttributes<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>
    | undefined;

  if (!LucideIcon) {
    if (name) {
      console.warn(`[design-system] Unknown icon: "${name}". Available icons: lucide-react set.`);
    }
    return null;
  }

  const resolvedSize = typeof size === 'number' ? size : sizeMap[size];
  const hidden = ariaHidden ?? (label ? false : true);

  return (
    <LucideIcon
      ref={ref}
      role={hidden ? undefined : 'img'}
      aria-hidden={hidden || undefined}
      aria-label={!hidden ? label : undefined}
      width={resolvedSize}
      height={resolvedSize}
      color={color}
      className={classNames('med-icon', className)}
      strokeWidth={2}
      {...rest}
    />
  );
});

export { Icon };
export default Icon;