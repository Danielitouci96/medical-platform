import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export interface SidebarItemDef {
  id: string;
  label: React.ReactNode;
  icon?: IconName;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: React.ReactNode;
}

export interface SidebarProps {
  items?: SidebarItemDef[];
  activeId?: string;
  onSelect?: (item: SidebarItemDef) => void;
  /** Header element above the item list. */
  header?: React.ReactNode;
  /** Footer element below the item list. */
  footer?: React.ReactNode;
  /** Narrow rail mode (only icons). */
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  /** Whether the sidebar can collapse. */
  collapsible?: boolean;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    items = [],
    activeId,
    onSelect,
    header,
    footer,
    collapsed,
    onCollapseChange,
    collapsible,
    className,
    children,
    'aria-label': ariaLabel = 'Sidebar',
  },
  ref,
) {
  const isCollapsed = collapsible ? Boolean(collapsed) : false;

  return (
    <aside
      ref={ref}
      className={classNames('med-sidebar', isCollapsed && 'med-sidebar--collapsed', className)}
      aria-label={ariaLabel}
    >
      {header ? <div className="med-sidebar__header">{header}</div> : null}
      <nav className="med-sidebar__nav" aria-label={ariaLabel}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => onSelect?.(item)}
              className={classNames(
                'med-sidebar__item',
                active && 'med-sidebar__item--active',
              )}
              aria-current={active ? 'page' : undefined}
              title={isCollapsed && typeof item.label === 'string' ? item.label : undefined}
            >
              {item.icon ? <Icon name={item.icon} size="md" className="med-sidebar__item-icon" aria-hidden="true" /> : null}
              {!isCollapsed ? (
                <>
                  <span className="med-sidebar__item-label">{item.label}</span>
                  {item.badge ? <span className="med-sidebar__item-badge">{item.badge}</span> : null}
                </>
              ) : null}
            </button>
          );
        })}
        {children}
      </nav>
      {/* El conmutador va siempre montado mientras `collapsible` esté activo:
          si solo se pintara expandido, al colapsar se desmontaría y el rail
          se quedaría sin forma de volver a abrirse. En modo rail se queda
          solo el icono, y el title hace de etiqueta. */}
      {collapsible ? (
        <div className="med-sidebar__collapse">
          <button
            type="button"
            className="med-sidebar__collapse-btn"
            onClick={() => onCollapseChange?.(!isCollapsed)}
            aria-label={isCollapsed ? 'Expandir navegación' : 'Colapsar navegación'}
            aria-expanded={!isCollapsed}
            title={isCollapsed ? 'Expandir navegación' : undefined}
          >
            <Icon
              name={isCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'}
              size="sm"
              aria-hidden="true"
            />
          </button>
        </div>
      ) : null}
      {footer ? <div className="med-sidebar__footer">{footer}</div> : null}
    </aside>
  );
});

export { Sidebar };
export default Sidebar;