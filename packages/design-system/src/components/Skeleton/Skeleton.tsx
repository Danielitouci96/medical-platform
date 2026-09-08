import * as React from 'react';
import classNames from 'classnames';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width in px or CSS value. */
  width?: number | string;
  /** Height in px or CSS value. */
  height?: number | string;
  /** Renders as a circle. */
  circle?: boolean;
  /** Renders as a text line (auto height). */
  text?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { width, height, circle, text, className, style, ...rest },
  ref,
) {
  const resolvedStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'med-skeleton',
        circle && 'med-skeleton--circle',
        text && 'med-skeleton--text',
        className,
      )}
      style={resolvedStyle}
      aria-hidden="true"
      {...rest}
    />
  );
});

export { Skeleton };
export default Skeleton;