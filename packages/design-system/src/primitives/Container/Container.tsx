import * as React from 'react';
import classNames from 'classnames';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum container width. */
  size?: ContainerSize;
  /** Whether to center the container. */
  centered?: boolean;
  /** Horizontal padding to apply at small screens. */
  paddingX?: number | string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'xl', centered = true, paddingX = 'md', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames('med-container', `med-container--${size}`, className, {
        'med-container--centered': centered,
      })}
      style={typeof paddingX === 'number' ? { paddingLeft: `var(--space-${paddingX})`, paddingRight: `var(--space-${paddingX})` } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

export { Container };
export default Container;