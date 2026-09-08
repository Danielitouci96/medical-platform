import * as React from 'react';
import classNames from 'classnames';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'display';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (defaults to matching the visual size). */
  as?: HeadingLevel;
  /** Visual size. */
  size?: HeadingSize;
  /** Text tone. */
  tone?: 'default' | 'secondary';
}

const sizeToElement: Record<HeadingSize, HeadingLevel> = {
  sm: 3,
  md: 3,
  lg: 2,
  xl: 1,
  '2xl': 1,
  '3xl': 1,
  display: 1,
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as, size = 'lg', tone = 'default', className, children, ...rest },
  ref,
) {
  const Comp = `h${as ?? sizeToElement[size]}` as 'h1';

  return (
    <Comp ref={ref} className={classNames('med-heading', `med-heading--${size}`, `med-heading--tone-${tone}`, className)} {...rest}>
      {children}
    </Comp>
  );
});

export { Heading };
export default Heading;