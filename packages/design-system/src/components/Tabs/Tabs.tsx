import * as React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export interface TabDef {
  value: string;
  label: React.ReactNode;
  icon?: IconName;
  disabled?: boolean;
  badge?: React.ReactNode;
  content?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange' | 'dir'> {
  tabs: TabDef[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'underline' | 'pills' | 'enclosed';
  loop?: boolean;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    tabs,
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    variant = 'underline',
    loop,
    className,
    ...rest
  },
  ref,
) {
  return (
    <RadixTabs.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={classNames('med-tabs', `med-tabs--${orientation}`, `med-tabs--${variant}`, className)}
      {...rest}
    >
      <RadixTabs.List className="med-tabs__list" loop={loop}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="med-tabs__trigger"
            data-icon={tab.icon ? 'true' : undefined}
          >
            {tab.icon ? <Icon name={tab.icon} size="sm" aria-hidden="true" /> : null}
            {tab.label}
            {tab.badge ? <span className="med-tabs__badge">{tab.badge}</span> : null}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) =>
        tab.content !== undefined ? (
          <RadixTabs.Content key={tab.value} value={tab.value} className="med-tabs__content">
            {tab.content}
          </RadixTabs.Content>
        ) : null,
      )}
    </RadixTabs.Root>
  );
});

export { Tabs };
export default Tabs;