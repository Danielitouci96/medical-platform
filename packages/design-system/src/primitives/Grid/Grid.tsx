import * as React from 'react';
import classNames from 'classnames';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns. */
  columns?: number;
  /** Responsive columns (breakpoint -> number of columns). */
  columnsAt?: Record<string, number>;
  /** Gap between grid cells. */
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  /** Align items. */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Justify items. */
  justifyItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

function gapValue(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `var(--space-${value})`;
  return value;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 1, columnsAt, gap = 'md', rowGap, columnGap, alignItems, justifyItems, className, style, children, ...rest },
  ref,
) {
  const responsiveStyles: React.CSSProperties = {};
  if (columnsAt) {
    for (const [bp, cols] of Object.entries(columnsAt)) {
      (responsiveStyles as Record<string, string>)[`--med-grid-cols-${bp}`] = String(cols);
    }
  }

  return (
    <div
      ref={ref}
      className={classNames('med-grid', className)}
      style={
        {
          '--med-grid-cols': columns,
          alignItems,
          justifyItems,
          gap: gapValue(gap),
          rowGap: gapValue(rowGap),
          columnGap: gapValue(columnGap),
          ...responsiveStyles,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
});

export { Grid };
export default Grid;