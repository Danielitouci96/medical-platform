import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';
import { Link } from '../../primitives/Link/Link';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: IconName;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Custom separator icon. */
  separator?: IconName;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, separator = 'ChevronRight', className, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={classNames('med-breadcrumb', className)} {...rest}>
      <ol className="med-breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={classNames('med-breadcrumb__item', isLast && 'med-breadcrumb__item--current')}>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="med-breadcrumb__link"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon ? <Icon name={item.icon} size="xs" aria-hidden="true" /> : null}
                  {item.label}
                </Link>
              ) : (
                <span className="med-breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
                  {item.icon ? <Icon name={item.icon} size="xs" aria-hidden="true" /> : null}
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span className="med-breadcrumb__separator" aria-hidden="true">
                  <Icon name={separator} size="xs" />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

export { Breadcrumb };
export default Breadcrumb;