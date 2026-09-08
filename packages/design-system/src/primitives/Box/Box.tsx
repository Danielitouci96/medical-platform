import * as React from 'react';
import classNames from 'classnames';

export type BoxDisplay = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none';
export type BoxDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type BoxAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type BoxJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type BoxWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

// Map to our semantic spacing tokens. Accepts raw numbers too (interpreted as
// multiples of the base spacing unit) or a spacing token suffix.
export type SpaceValue = number | 'auto' | '0' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '12' | '14' | '16' | '20' | '24' | '28' | '32';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render as. */
  as?: React.ElementType;
  /** Display behavior. */
  display?: BoxDisplay;
  /** Flex/grid direction. */
  flexDirection?: BoxDirection;
  /** Align items along the cross axis. */
  alignItems?: BoxAlign;
  /** Justify content along the main axis. */
  justifyContent?: BoxJustify;
  /** Flex wrap behavior. */
  flexWrap?: BoxWrap;
  /** Gap between children (semantic spacing token). */
  gap?: SpaceValue;
  /** Row gap. */
  rowGap?: SpaceValue;
  /** Column gap. */
  columnGap?: SpaceValue;
  /** Padding on all sides. */
  padding?: SpaceValue;
  /** Horizontal padding (left/right). */
  paddingX?: SpaceValue;
  /** Vertical padding (top/bottom). */
  paddingY?: SpaceValue;
  paddingTop?: SpaceValue;
  paddingRight?: SpaceValue;
  paddingBottom?: SpaceValue;
  paddingLeft?: SpaceValue;
  /** Margin on all sides. */
  margin?: SpaceValue;
  marginX?: SpaceValue;
  marginY?: SpaceValue;
  marginTop?: SpaceValue;
  marginRight?: SpaceValue;
  marginBottom?: SpaceValue;
  marginLeft?: SpaceValue;
  flex?: string | number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  /** CSS width. */
  width?: number | string;
  /** CSS height. */
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  /** CSS position. */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** CSS z-index token. */
  zIndex?: number;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  /** Utility class name for the style function (not used directly). */
  className?: string;
}

function spaceToken(value?: SpaceValue): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `var(--space-${value})`;
  if (value === 'auto') return 'auto';
  // Dot notation needs escaping in CSS variable names: --space-1.5
  return `var(--space-${value.replace('.', '\\.')})`;
}

function numOrStr(value?: number | string): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Comp = 'div',
    display,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    gap,
    rowGap,
    columnGap,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    position,
    zIndex,
    overflow,
    className,
    style,
    ...rest
  },
  ref,
) {
  const resolvedStyle: React.CSSProperties = {
    display,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    gap: spaceToken(gap),
    rowGap: spaceToken(rowGap),
    columnGap: spaceToken(columnGap),
    paddingTop: spaceToken(paddingTop) ?? spaceToken(paddingY) ?? spaceToken(padding),
    paddingRight: spaceToken(paddingRight) ?? spaceToken(paddingX) ?? spaceToken(padding),
    paddingBottom: spaceToken(paddingBottom) ?? spaceToken(paddingY) ?? spaceToken(padding),
    paddingLeft: spaceToken(paddingLeft) ?? spaceToken(paddingX) ?? spaceToken(padding),
    marginTop: spaceToken(marginTop) ?? spaceToken(marginY) ?? spaceToken(margin),
    marginRight: spaceToken(marginRight) ?? spaceToken(marginX) ?? spaceToken(margin),
    marginBottom: spaceToken(marginBottom) ?? spaceToken(marginY) ?? spaceToken(margin),
    marginLeft: spaceToken(marginLeft) ?? spaceToken(marginX) ?? spaceToken(margin),
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    width: numOrStr(width),
    height: numOrStr(height),
    minWidth: numOrStr(minWidth),
    minHeight: numOrStr(minHeight),
    maxWidth: numOrStr(maxWidth),
    maxHeight: numOrStr(maxHeight),
    position,
    zIndex,
    overflow,
    ...style,
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Comp ref={ref as any} className={classNames('med-box', className)} style={resolvedStyle} {...rest} />
  );
});

export { Box };
export default Box;