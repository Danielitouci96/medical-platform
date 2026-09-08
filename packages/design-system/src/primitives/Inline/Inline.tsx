import * as React from 'react';
import classNames from 'classnames';
import { Box, type BoxProps } from '../Box/Box';

export interface InlineProps extends Omit<BoxProps, 'display' | 'flexDirection'> {
  /** Gap between children. */
  gap?: BoxProps['gap'];
  /** Align items. */
  align?: BoxProps['alignItems'];
  /** Wrap behavior. */
  wrap?: boolean;
}

const Inline = React.forwardRef<HTMLElement, InlineProps>(function Inline(
  { gap = 2, align, wrap = true, className, children, ...rest },
  ref,
) {
  return (
    <Box
      ref={ref}
      display="flex"
      alignItems={align}
      gap={gap}
      flexWrap={wrap ? 'wrap' : 'nowrap'}
      className={classNames('med-inline', className)}
      {...rest}
    >
      {children}
    </Box>
  );
});

export { Inline };
export default Inline;