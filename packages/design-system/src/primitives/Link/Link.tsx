import * as React from 'react';
import classNames from 'classnames';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual appearance. */
  variant?: 'default' | 'subtle' | 'button';
  /** Whether the link opens in a new tab (adds target="_blank" rel="noopener"). */
  external?: boolean;
  /** Use an underline even without hover. */
  underline?: 'always' | 'hover' | 'none';
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'default', external, underline = 'hover', className, children, target, rel, ...rest },
  ref,
) {
  const externalProps = external ? { target: target ?? '_blank', rel: rel ?? 'noopener noreferrer' } : {};

  return (
    <a
      ref={ref}
      className={classNames(
        'med-link',
        `med-link--${variant}`,
        `med-link--underline-${underline}`,
        className,
      )}
      {...externalProps}
      {...rest}
    >
      {children}
    </a>
  );
});

export { Link };
export default Link;