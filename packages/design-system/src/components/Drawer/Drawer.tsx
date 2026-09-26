import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';

export type DrawerSide = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  /**
   * Superficie del panel. `inverse` re-tema los componentes anidados (labels,
   * helper text, ghost buttons, dividers) para que se lean sobre un fondo
   * oscuro o saturado; útil cuando el drawer se tema con `--drawer-background`.
   */
  surface?: 'default' | 'inverse';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { open, onOpenChange, title, description, side = 'right', size = 'md', surface = 'default', children, footer, className },
  ref,
) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="med-drawer__overlay" />
        <RadixDialog.Content
          ref={ref}
          data-med-surface={surface === 'inverse' ? 'inverse' : undefined}
          className={classNames(
            'med-drawer',
            `med-drawer--side-${side}`,
            `med-drawer--size-${size}`,
            className,
          )}
        >
          <div className="med-drawer__header">
            <div className="med-drawer__heading">
              {title ? <RadixDialog.Title className="med-drawer__title">{title}</RadixDialog.Title> : null}
              {description ? (
                <RadixDialog.Description className="med-drawer__description">{description}</RadixDialog.Description>
              ) : null}
            </div>
            <RadixDialog.Close asChild>
              <button type="button" className="med-drawer__close" aria-label="Close">
                <Icon name="X" size="sm" aria-hidden="true" />
              </button>
            </RadixDialog.Close>
          </div>
          <div className="med-drawer__body">{children}</div>
          {footer ? <div className="med-drawer__footer">{footer}</div> : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});

export { Drawer };
export default Drawer;