import * as React from 'react';
import classNames from 'classnames';
import { Box, type BoxProps } from '../Box/Box';

export type TextTone = 'default' | 'secondary' | 'tertiary' | 'disabled' | 'inverse' | 'success' | 'warning' | 'danger' | 'info';
export type TextSize = '2xs' | 'xs' | 'sm' | 'base' | 'lg';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends Omit<BoxProps, 'as'> {
  /** Element to render as. */
  as?: 'span' | 'p' | 'div' | 'label' | 'small' | 'strong' | 'em';
  /** Text tone (semantic color). */
  tone?: TextTone;
  /** Font size. */
  size?: TextSize;
  /** Font weight. */
  weight?: TextWeight;
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Truncate with ellipsis (single line). */
  truncate?: boolean;
  /** Visually hidden but available to screen readers. */
  visuallyHidden?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { as = 'span', tone = 'default', size, weight, align, truncate, visuallyHidden, className, style, children, ...rest },
  ref,
) {
  const resolvedStyle: React.CSSProperties = {
    textAlign: align,
    ...style,
  };

  return (
    <Box
      as={as}
      ref={ref}
      className={classNames(
        'med-text',
        `med-text--tone-${tone}`,
        size && `med-text--size-${size}`,
        weight && `med-text--weight-${weight}`,
        truncate && 'med-text--truncate',
        visuallyHidden && 'med-visually-hidden',
        className,
      )}
      style={resolvedStyle}
      {...rest}
    >
      {children}
    </Box>
  );
});

export { Text };
export default Text;