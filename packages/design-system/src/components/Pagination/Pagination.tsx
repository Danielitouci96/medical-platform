import * as React from 'react';
import classNames from 'classnames';
import { IconButton } from '../IconButton/IconButton';
import { Select, SelectItem } from '../Select/Select';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Total number of items. */
  totalItems?: number;
  /** Page size. */
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  /** Show total count text. */
  showTotal?: boolean;
  /** Show page numbers (can be hidden if many pages). */
  showPageNumbers?: boolean;
}

function getVisiblePages(page: number, pageCount: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const window = 1;

  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - window && i <= page + window)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }
  return pages;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  {
    page,
    pageCount,
    onPageChange,
    totalItems,
    pageSize,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
    showTotal = true,
    showPageNumbers = true,
    className,
    ...rest
  },
  ref,
) {
  const pages = getVisiblePages(page, pageCount);
  const from = totalItems !== undefined && pageSize ? (page - 1) * pageSize + 1 : undefined;
  const to = totalItems !== undefined && pageSize ? Math.min(page * pageSize, totalItems) : undefined;

  const handlePageSize = (value: string) => {
    const size = Number(value);
    onPageSizeChange?.(size);
  };

  return (
    <div ref={ref} className={classNames('med-pagination', className)} {...rest}>
      {showTotal && totalItems !== undefined ? (
        <div className="med-pagination__info">
          {from}–{to} of {totalItems}
        </div>
      ) : null}

      {pageSize && onPageSizeChange ? (
        <div className="med-pagination__page-size">
          <span className="med-pagination__page-size-label">Rows per page</span>
          <Select value={String(pageSize)} onValueChange={handlePageSize} size="sm" ariaLabel="Rows per page" className="med-pagination__select">
            {pageSizeOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </Select>
        </div>
      ) : null}

      <nav className="med-pagination__controls" aria-label="Pagination">
        <IconButton
          icon="ChevronLeft"
          aria-label="Previous page"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        {showPageNumbers ? (
          <div className="med-pagination__numbers">
            {pages.map((p, i) =>
              p === 'ellipsis' ? (
                <span key={`e-${i}`} className="med-pagination__ellipsis">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className={classNames('med-pagination__number', p === page && 'med-pagination__number--active')}
                  aria-current={p === page ? 'page' : undefined}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </button>
              ),
            )}
          </div>
        ) : (
          <span className="med-pagination__page-indicator">
            {page} / {pageCount}
          </span>
        )}
        <IconButton
          icon="ChevronRight"
          aria-label="Next page"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        />
      </nav>
    </div>
  );
});

export { Pagination };
export default Pagination;