import * as React from 'react';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';
import { Divider } from '../../primitives/Divider/Divider';

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { trigger, children, align = 'end', side = 'bottom', sideOffset = 4, className },
  ref,
) {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>{trigger}</RadixDropdown.Trigger>
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          ref={ref}
          className={classNames('med-dropdown', className)}
          align={align}
          side={side}
          sideOffset={sideOffset}
        >
          {children}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
});

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof RadixDropdown.Item> {
  icon?: IconName;
  /** Visual tone for destructive actions. */
  danger?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(function DropdownMenuItem(
  { icon, danger, className, children, ...rest },
  ref,
) {
  return (
    <RadixDropdown.Item
      ref={ref}
      className={classNames('med-dropdown__item', danger && 'med-dropdown__item--danger', className)}
      {...rest}
    >
      {icon ? <Icon name={icon} size="sm" className="med-dropdown__item-icon" aria-hidden="true" /> : null}
      <span className="med-dropdown__item-label">{children}</span>
    </RadixDropdown.Item>
  );
});

export interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixDropdown.CheckboxItem> {
  icon?: IconName;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  function DropdownMenuCheckboxItem({ icon, className, children, ...rest }, ref) {
    return (
      <RadixDropdown.CheckboxItem
        ref={ref}
        className={classNames('med-dropdown__item', className)}
        {...rest}
      >
        <span className="med-dropdown__item-indicator">
          <RadixDropdown.ItemIndicator>
            <Icon name="Check" size="xs" aria-hidden="true" />
          </RadixDropdown.ItemIndicator>
        </span>
        {icon ? <Icon name={icon} size="sm" className="med-dropdown__item-icon" aria-hidden="true" /> : null}
        <span className="med-dropdown__item-label">{children}</span>
      </RadixDropdown.CheckboxItem>
    );
  },
);

export interface DropdownMenuItemShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const DropdownMenuItemShortcut = React.forwardRef<HTMLSpanElement, DropdownMenuItemShortcutProps>(
  function DropdownMenuItemShortcut({ children, className, ...rest }, ref) {
    return (
      <span ref={ref} className={classNames('med-dropdown__shortcut', className)} {...rest}>
        {children}
      </span>
    );
  },
);

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Separator>
>(function DropdownMenuSeparator(props, ref) {
  return <RadixDropdown.Separator ref={ref} className="med-dropdown__separator" {...props} />;
});

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Label>
>(function DropdownMenuLabel({ className, children, ...rest }, ref) {
  return (
    <RadixDropdown.Label ref={ref} className={classNames('med-dropdown__label', className)} {...rest}>
      {children}
    </RadixDropdown.Label>
  );
});

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuItemShortcut,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Divider as DropdownMenuDivider,
};
export default DropdownMenu;