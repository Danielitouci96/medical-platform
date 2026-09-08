import * as React from 'react';
import classNames from 'classnames';
import { Box, type BoxProps } from '../Box/Box';

export type StackAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch';
export type StackJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface StackProps extends Omit<BoxProps, 'display' | 'flexDirection'> {
  /** Stack direction. */
  direction?: 'row' | 'column' | 'responsive';
  /** Gap between children. */
  gap?: BoxProps['gap'];
  /** Align items. */
  align?: StackAlign;
  /** Justify content. */
  justify?: StackJustify;
}

const Stack = React.forwardRef<HTMLElement, StackProps>(function Stack(
  { direction = 'column', gap = 4, align, justify, className, children, ...rest },
  ref,
) {
  const isResponsive = direction === 'responsive';

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection={isResponsive ? 'column' : direction}
      alignItems={align}
      justifyContent={justify}
      gap={gap}
      className={classNames('med-stack', className, {
        'med-stack--responsive': isResponsive,
      })}
      {...rest}
    >
      {children}
    </Box>
  );
});

export { Stack };
export default Stack;