import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo or brand area. */
  brand?: React.ReactNode;
  /** Main navigation links. */
  children?: React.ReactNode;
  /** Actions on the right side (icons, menus, profile). */
  actions?: React.ReactNode;
  /** The navbar color scheme. */
  tone?: 'default' | 'inverted';
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { brand, children, actions, tone = 'default', className, ...rest },
  ref,
) {
  return (
    <header
      ref={ref}
      className={classNames('med-navbar', `med-navbar--${tone}`, className)}
      role="banner"
      {...rest}
    >
      {brand ? <div className="med-navbar__brand">{brand}</div> : null}
      <nav className="med-navbar__nav" aria-label="Main navigation">
        {children}
      </nav>
      {actions ? <div className="med-navbar__actions">{actions}</div> : null}
    </header>
  );
});

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  icon?: IconName;
}

const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(function NavbarLink(
  { active, icon, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={classNames('med-navbar__link', active && 'med-navbar__link--active', className)}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {icon ? <Icon name={icon} size="sm" aria-hidden="true" /> : null}
      {children}
    </a>
  );
});

export { Navbar, NavbarLink };
export default Navbar;