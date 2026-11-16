import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

export interface TreeNode {
  /** Stable id used for expansion state and aria-controls. */
  id: string;
  label: React.ReactNode;
  /** Optional leading icon. */
  icon?: IconName;
  /** Short code rendered next to the label. */
  code?: React.ReactNode;
  /** Secondary line rendered below the label on leaf rows. */
  description?: React.ReactNode;
  /** Badges or counters rendered next to the branch row or leaf actions. */
  meta?: React.ReactNode;
  /** Leaf-only actions rendered on the right side. */
  actions?: React.ReactNode;
  /** Child nodes. Presence of this property makes the node expandable. */
  children?: TreeNode[];
  /** Message rendered when an expandable node has no children. */
  empty?: React.ReactNode;
}

type TreeStyle = React.CSSProperties & { '--med-tree-depth'?: number };

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onToggle'> {
  nodes: TreeNode[];
  /** Ids of the currently expanded branches. */
  expandedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
  loading?: boolean;
  loadingRows?: number;
  error?: React.ReactNode;
  empty?: React.ReactNode;
  /** Accessible name for the tree region. */
  label?: string;
}

function isBranch(node: TreeNode): boolean {
  return node.children !== undefined || node.empty !== undefined;
}

function panelId(baseId: string, nodeId: string): string {
  return `${baseId}-${nodeId.replace(/[^a-zA-Z0-9_-]/g, '-')}-children`;
}

interface TreeItemProps {
  node: TreeNode;
  depth: number;
  baseId: string;
  expandedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
}

function TreeItem({ node, depth, baseId, expandedIds, onToggle }: TreeItemProps) {
  const style: TreeStyle = { '--med-tree-depth': depth };
  const branch = isBranch(node);
  const expanded = branch && expandedIds.has(node.id);
  const id = panelId(baseId, node.id);

  if (!branch) {
    return (
      <li className="med-tree__leaf" style={style}>
        <div className="med-tree__leaf-body">
          <div className="med-tree__leaf-title">
            {node.icon ? (
              <Icon
                name={node.icon}
                size="xs"
                className="med-tree__leaf-icon"
                aria-hidden="true"
              />
            ) : null}
            <span className="med-tree__label">{node.label}</span>
            {node.code ? <span className="med-tree__code">{node.code}</span> : null}
          </div>
          {node.description ? (
            <div className="med-tree__description">{node.description}</div>
          ) : null}
        </div>
        {node.meta || node.actions ? (
          <div className="med-tree__leaf-actions">
            {node.meta ? <span className="med-tree__meta">{node.meta}</span> : null}
            {node.actions}
          </div>
        ) : null}
      </li>
    );
  }

  const children = node.children ?? [];
  const hasChildren = children.length > 0;
  const leavesOnly = hasChildren && children.every((child) => !isBranch(child));

  return (
    <li className={classNames('med-tree__item', depth === 0 && 'med-tree__item--root')}>
      <button
        type="button"
        className={classNames(
          'med-tree__row',
          depth === 0 ? 'med-tree__row--root' : 'med-tree__row--nested',
        )}
        style={style}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => onToggle(node.id)}
      >
        <Icon name="ChevronRight" size="xs" className="med-tree__chevron" aria-hidden="true" />
        {node.icon ? (
          <span className="med-tree__icon">
            <Icon name={node.icon} size="xs" aria-hidden="true" />
          </span>
        ) : null}
        <span className="med-tree__label">{node.label}</span>
        {node.code ? <span className="med-tree__code">{node.code}</span> : null}
        {node.meta ? <span className="med-tree__meta">{node.meta}</span> : null}
      </button>

      <div className={classNames('med-tree__children', expanded && 'is-open')} id={id}>
        <div className="med-tree__children-inner">
          {hasChildren ? (
            <ul
              className={classNames(
                'med-tree__list',
                'med-tree__list--nested',
                leavesOnly && 'med-tree__list--leaves',
              )}
            >
              {children.map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  baseId={baseId}
                  expandedIds={expandedIds}
                  onToggle={onToggle}
                />
              ))}
            </ul>
          ) : (
            <div className="med-tree__empty">{node.empty}</div>
          )}
        </div>
      </div>
    </li>
  );
}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(function Tree(
  {
    nodes,
    expandedIds,
    onToggle,
    loading = false,
    loadingRows = 8,
    error,
    empty = 'No hay datos para mostrar.',
    label,
    className,
    ...rest
  },
  ref,
) {
  const baseId = React.useId().replace(/:/g, '');

  if (loading) {
    return (
      <div
        ref={ref}
        className={classNames('med-tree', 'med-tree--loading', className)}
        role="group"
        aria-label={label}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: loadingRows }, (_, index) => (
          <div key={index} className="med-tree__skeleton">
            <Skeleton
              height={index % 3 === 0 ? 24 : 18}
              width={index % 3 === 0 ? '95%' : '100%'}
            />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        ref={ref}
        className={classNames('med-tree', 'med-tree__state', 'med-tree__state--error', className)}
        role="alert"
        {...rest}
      >
        <Icon name="CircleAlert" size="md" aria-hidden="true" />
        <div className="med-tree__state-body">{error}</div>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div ref={ref} className={classNames('med-tree', 'med-tree__state', className)} {...rest}>
        <Icon name="Inbox" size="md" aria-hidden="true" />
        <div className="med-tree__state-body">{empty}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={classNames('med-tree', className)}
      role="group"
      aria-label={label}
      {...rest}
    >
      <ul className="med-tree__list med-tree__list--root">
        {nodes.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            depth={0}
            baseId={baseId}
            expandedIds={expandedIds}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
});

export interface TreeToolbarProps {
  /** Search control, usually a SearchInput plus an optional clear action. */
  search?: React.ReactNode;
  /** Result summary, aligned to the right of the search row. */
  summary?: React.ReactNode;
  /** Secondary actions, rendered on their own row. */
  actions?: React.ReactNode;
  className?: string;
}

const TreeToolbar = React.forwardRef<HTMLDivElement, TreeToolbarProps>(function TreeToolbar(
  { search, summary, actions, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-tree-toolbar', className)}>
      {search || summary ? (
        <div className="med-tree-toolbar__main">
          {search ? <div className="med-tree-toolbar__search">{search}</div> : null}
          {summary ? <div className="med-tree-toolbar__summary">{summary}</div> : null}
        </div>
      ) : null}
      {actions ? <div className="med-tree-toolbar__actions">{actions}</div> : null}
    </div>
  );
});

export { Tree, TreeToolbar };
export default Tree;
