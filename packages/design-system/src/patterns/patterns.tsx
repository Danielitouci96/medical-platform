import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../icons/Icon';

export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Actions rendered on the right (buttons, etc.). */
  actions?: React.ReactNode;
  /** Breadcrumb rendered above the title. */
  breadcrumb?: React.ReactNode;
  className?: string;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { title, description, actions, breadcrumb, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-page-header', className)}>
      {breadcrumb ? <div className="med-page-header__breadcrumb">{breadcrumb}</div> : null}
      <div className="med-page-header__row">
        <div className="med-page-header__heading">
          <h2 className="med-page-header__title">{title}</h2>
          {description ? <p className="med-page-header__description">{description}</p> : null}
        </div>
        {actions ? <div className="med-page-header__actions">{actions}</div> : null}
      </div>
    </div>
  );
});

export interface SectionHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(function SectionHeader(
  { title, description, actions, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-section-header', className)}>
      <div className="med-section-header__heading">
        <h3 className="med-section-header__title">{title}</h3>
        {description ? <p className="med-section-header__description">{description}</p> : null}
      </div>
      {actions ? <div className="med-section-header__actions">{actions}</div> : null}
    </div>
  );
});

export interface SearchBarProps {
  value?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
  icon?: IconName;
  className?: string;
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(function SearchBar(
  { value, onSearchChange, placeholder = 'Search…', icon = 'Search', className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-search-bar', className)}>
      <Icon name={icon} size="sm" className="med-search-bar__icon" aria-hidden="true" />
      <input
        type="search"
        className="med-search-bar__input"
        value={value}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value ? (
        <button
          type="button"
          className="med-search-bar__clear"
          onClick={() => onSearchChange?.('')}
          aria-label="Clear search"
        >
          <Icon name="X" size="sm" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

export interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(function ActionBar(
  { children, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-action-bar', className)}>
      {children}
    </div>
  );
});

export interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { children, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-toolbar', className)}>
      {children}
    </div>
  );
});

export interface KeyValueListProps {
  items: Array<{ key: React.ReactNode; value: React.ReactNode }>;
  className?: string;
}

const KeyValueList = React.forwardRef<HTMLDListElement, KeyValueListProps>(function KeyValueList(
  { items, className },
  ref,
) {
  return (
    <dl ref={ref} className={classNames('med-key-value-list', className)}>
      {items.map((item, i) => (
        <div key={i} className="med-key-value-list__item">
          <dt className="med-key-value-list__key">{item.key}</dt>
          <dd className="med-key-value-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
});

export interface DetailPanelProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const DetailPanel = React.forwardRef<HTMLDivElement, DetailPanelProps>(function DetailPanel(
  { title, children, actions, className },
  ref,
) {
  return (
    <section ref={ref} className={classNames('med-detail-panel', className)}>
      {title ? (
        <div className="med-detail-panel__header">
          <h3 className="med-detail-panel__title">{title}</h3>
          {actions ? <div className="med-detail-panel__actions">{actions}</div> : null}
        </div>
      ) : null}
      <div className="med-detail-panel__body">{children}</div>
    </section>
  );
});

export {
  PageHeader,
  SectionHeader,
  SearchBar,
  ActionBar,
  Toolbar,
  KeyValueList,
  DetailPanel,
};