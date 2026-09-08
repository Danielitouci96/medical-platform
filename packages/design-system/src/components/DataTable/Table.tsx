import * as React from 'react';
import classNames from 'classnames';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Zebra striping for rows. */
  striped?: boolean;
  /** Compact row density. */
  dense?: boolean;
  /** Hover highlight. */
  hoverable?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped, dense, hoverable = true, className, children, ...rest },
  ref,
) {
  return (
    <div className="med-table__scroll">
      <table
        ref={ref}
        className={classNames(
          'med-table',
          striped && 'med-table--striped',
          dense && 'med-table--dense',
          hoverable && 'med-table--hoverable',
          className,
        )}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
});

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, children, ...rest }, ref) {
    return (
      <thead ref={ref} className={classNames('med-table__head', className)} {...rest}>
        {children}
      </thead>
    );
  },
);

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, children, ...rest }, ref) {
    return (
      <tbody ref={ref} className={classNames('med-table__body', className)} {...rest}>
        {children}
      </tbody>
    );
  },
);

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, children, ...rest }, ref) {
    return (
      <tr ref={ref} className={classNames('med-table__row', className)} {...rest}>
        {children}
      </tr>
    );
  },
);

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, children, ...rest }, ref) {
    return (
      <th ref={ref} className={classNames('med-table__head-cell', className)} {...rest}>
        {children}
      </th>
    );
  },
);

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, children, ...rest }, ref) {
    return (
      <td ref={ref} className={classNames('med-table__cell', className)} {...rest}>
        {children}
      </td>
    );
  },
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
export default Table;