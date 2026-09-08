import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';
import { Pagination } from '../Pagination/Pagination';

export type SortDirection = 'asc' | 'desc';

export interface DataTableColumn<T> {
  /** Unique column id. */
  id: string;
  /** Key to access the value on the row for default rendering/sorting. */
  accessorKey?: keyof T & string;
  /** Header label or render function. */
  header: React.ReactNode | ((ctx: DataTableHeaderContext<T>) => React.ReactNode);
  /** Custom cell renderer. When absent, uses accessorKey value. */
  cell?: (row: T, ctx: DataTableColumnCellContext) => React.ReactNode;
  /** Disable sorting for this column. */
  enableSorting?: boolean;
  /** Default sort direction when applied. */
  sortDescFirst?: boolean;
  /** Column width (px or CSS value). */
  width?: number | string;
  /** Hide on smaller viewports (simple responsive flag). */
  hideBelow?: 'sm' | 'md' | 'lg';
  /** Alignment of the cell. */
  align?: 'left' | 'center' | 'right';
  /** Extra class for the header cell. */
  headerClassName?: string;
  /** Extra class for the body cells. */
  cellClassName?: string;
}

export interface DataTableHeaderContext<T> {
  column: DataTableColumn<T>;
  sortDirection: SortDirection | null;
  sorted: boolean;
  toggleSort: () => void;
}

export interface DataTableColumnCellContext {
  index: number;
}

export interface DataTableSortState {
  columnId: string;
  direction: SortDirection;
}

export interface DataTableSelection<T> {
  selectedRows: T[];
  isRowSelected: (row: T) => boolean;
  toggleRow: (row: T) => void;
  toggleAll: () => void;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  clearSelection: () => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Unique key for each row. */
  getRowId: (row: T) => string;
  /** Loading skeleton rows while fetching. */
  isLoading?: boolean;
  isError?: boolean;
  error?: React.ReactNode;
  /** Selection — provide state + callbacks to enable selection. */
  selection?: {
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
  };
  /** Sort controlled externally (optional). When omitted, sorting is internal via onSortChange. */
  sort?: DataTableSortState | null;
  onSortChange?: (sort: DataTableSortState | null) => void;
  /** Enable internal pagination (optional). */
  pagination?: {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
    totalItems: number;
  };
  /** Bulk action toolbar shown when rows are selected. */
  bulkActions?: React.ReactNode;
  /** Renders a "row actions" column at the end. */
  renderRowActions?: (row: T) => React.ReactNode;
  rowActionsLabel?: string;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  loadingRows?: number;
  onRowClick?: (row: T) => void;
  className?: string;
  striped?: boolean;
  dense?: boolean;
}

const SortIcon = ({ direction }: { direction: SortDirection | null }) => {
  const name: IconName = direction === 'asc' ? 'ArrowUp' : direction === 'desc' ? 'ArrowDown' : 'ArrowUpDown';
  return (
    <span className="med-datatable__sort-icon" aria-hidden="true">
      <Icon name={name} size="sm" />
    </span>
  );
};

export function DataTable<T>({
  columns,
  data,
  getRowId,
  isLoading,
  isError,
  error,
  selection,
  sort: controlledSort,
  onSortChange,
  pagination,
  bulkActions,
  renderRowActions,
  rowActionsLabel = 'Actions',
  emptyState,
  errorState,
  loadingRows = 6,
  onRowClick,
  className,
  striped,
  dense,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = React.useState<DataTableSortState | null>(null);
  const sort = controlledSort ?? internalSort;

  const sortedData = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.id === sort.columnId);
    if (!col || !col.accessorKey) return data;

    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => {
      const av = a[col.accessorKey!];
      const bv = b[col.accessorKey!];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [data, sort, columns]);

  const selectedIdsSet = React.useMemo(
    () => new Set(selection?.selectedIds ?? []),
    [selection?.selectedIds],
  );

  const isAllSelected = data.length > 0 && data.every((r) => selectedIdsSet.has(getRowId(r)));
  const isSomeSelected = !isAllSelected && data.some((r) => selectedIdsSet.has(getRowId(r)));

  const handleSort = (column: DataTableColumn<T>) => {
    if (column.enableSorting === false) return;
    const next: DataTableSortState = sort?.columnId === column.id
      ? sort.direction === 'asc'
        ? { columnId: column.id, direction: 'desc' }
        : { columnId: column.id, direction: 'asc' }
      : { columnId: column.id, direction: column.sortDescFirst ? 'desc' : 'asc' };
    if (onSortChange) onSortChange(next);
    else setInternalSort(next);
  };

  const toggleRow = (row: T) => {
    if (!selection) return;
    const id = getRowId(row);
    const next = selectedIdsSet.has(id)
      ? selection.selectedIds.filter((sid) => sid !== id)
      : [...selection.selectedIds, id];
    selection.onSelectionChange(next);
  };

  const toggleAll = () => {
    if (!selection) return;
    if (isAllSelected) selection.onSelectionChange([]);
    else selection.onSelectionChange(data.map(getRowId));
  };

  const selectionCtx: DataTableSelection<T> | undefined = selection
    ? {
        selectedRows: data.filter((r) => selectedIdsSet.has(getRowId(r))),
        isRowSelected: (r) => selectedIdsSet.has(getRowId(r)),
        toggleRow,
        toggleAll,
        isAllSelected,
        isSomeSelected,
        clearSelection: () => selection.onSelectionChange([]),
      }
    : undefined;

  const renderHeader = (col: DataTableColumn<T>,): React.ReactNode =>
    typeof col.header === 'function'
      ? col.header({
          column: col,
          sortDirection: sort?.columnId === col.id ? sort.direction : null,
          sorted: sort?.columnId === col.id,
          toggleSort: () => handleSort(col),
        })
      : col.header;

  const renderCell = (row: T, col: DataTableColumn<T>, index: number): React.ReactNode => {
    if (col.cell) return col.cell(row, { index });
    if (col.accessorKey) return String(row[col.accessorKey] ?? '');
    return null;
  };

  const showActionsCol = Boolean(renderRowActions);
  const showSelectCol = Boolean(selection);
  const hasBulkActions = Boolean(bulkActions) && selectionCtx && selectionCtx.selectedRows.length > 0;

  return (
    <div className={classNames('med-datatable', className)}>
      {hasBulkActions ? <div className="med-datatable__bulk">{bulkActions}</div> : null}

      <div className="med-table__scroll">
        <table
          className={classNames(
            'med-table',
            striped && 'med-table--striped',
            dense && 'med-table--dense',
            onRowClick && 'med-table--clickable',
            'med-datatable__table',
          )}
        >
          <thead className="med-table__head">
            <tr className="med-table__row">
              {showSelectCol ? (
                <th className="med-table__head-cell med-datatable__select-cell">
                  <CheckboxCell
                    checked={isSomeSelected ? 'indeterminate' : isAllSelected}
                    onChange={toggleAll}
                    label="Select all rows"
                  />
                </th>
              ) : null}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={classNames(
                    'med-table__head-cell',
                    col.enableSorting !== false && 'med-table__head-cell--sortable',
                    col.align && `med-datatable__align-${col.align}`,
                    col.headerClassName,
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  aria-sort={
                    sort?.columnId === col.id
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {col.enableSorting === false ? (
                    renderHeader(col)
                  ) : (
                    <button
                      type="button"
                      className="med-datatable__sort-button"
                      onClick={() => handleSort(col)}
                    >
                      {renderHeader(col)}
                      <SortIcon direction={sort?.columnId === col.id ? sort.direction : null} />
                    </button>
                  )}
                </th>
              ))}
              {showActionsCol ? (
                <th className="med-table__head-cell med-datatable__actions-head">
                  <span className="med-visually-hidden">{rowActionsLabel}</span>
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody className="med-table__body">
            {isLoading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="med-table__row">
                  {showSelectCol ? <td className="med-table__cell med-datatable__select-cell" /> : null}
                  {columns.map((col) => (
                    <td key={col.id} className="med-table__cell">
                      <span className="med-skeleton med-skeleton--text" style={{ width: '80%' }} />
                    </td>
                  ))}
                  {showActionsCol ? <td className="med-table__cell" /> : null}
                </tr>
              ))
            ) : isError ? (
              <tr className="med-table__row">
                <td colSpan={columns.length + (showSelectCol ? 1 : 0) + (showActionsCol ? 1 : 0)} className="med-table__cell">
                  {errorState ?? (
                    <div className="med-datatable__state">{error ?? 'An error occurred while loading the data.'}</div>
                  )}
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr className="med-table__row">
                <td colSpan={columns.length + (showSelectCol ? 1 : 0) + (showActionsCol ? 1 : 0)} className="med-table__cell">
                  {emptyState ?? <div className="med-datatable__state">No data available.</div>}
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => {
                const id = getRowId(row);
                const selected = selectedIdsSet.has(id);
                return (
                  <tr
                    key={id}
                    className={classNames('med-table__row', selected && 'med-table__row--selected')}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {showSelectCol ? (
                      <td className="med-table__cell med-datatable__select-cell" onClick={(e) => e.stopPropagation()}>
                        <CheckboxCell
                          checked={selected}
                          onChange={() => toggleRow(row)}
                          label="Select row"
                        />
                      </td>
                    ) : null}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={classNames(
                          'med-table__cell',
                          col.align && `med-datatable__align-${col.align}`,
                          col.cellClassName,
                        )}
                      >
                        {renderCell(row, col, rowIndex)}
                      </td>
                    ))}
                    {showActionsCol ? (
                      <td className="med-table__cell med-datatable__actions-cell" onClick={(e) => e.stopPropagation()}>
                        {renderRowActions!(row)}
                      </td>
                    ) : null}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <Pagination
          page={pagination.page}
          pageCount={pagination.pageCount}
          onPageChange={pagination.onPageChange}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      ) : null}
    </div>
  );
}

// Local checkbox cell (kept internal to avoid circular imports).
function CheckboxCell({
  checked,
  onChange,
  label,
}: {
  checked: boolean | 'indeterminate';
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
      aria-label={label}
      className={classNames('med-datatable__checkbox', {
        'med-datatable__checkbox--checked': checked === true || checked === 'indeterminate',
        'med-datatable__checkbox--indeterminate': checked === 'indeterminate',
      })}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
    >
      {checked === 'indeterminate' ? (
        <span className="med-datatable__checkbox-indicator" aria-hidden="true">
          <Icon name="Minus" size="xs" />
        </span>
      ) : checked ? (
        <span className="med-datatable__checkbox-indicator" aria-hidden="true">
          <Icon name="Check" size="xs" />
        </span>
      ) : null}
    </button>
  );
}