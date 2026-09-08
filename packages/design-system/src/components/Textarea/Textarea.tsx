import * as React from 'react';
import classNames from 'classnames';
import type { InputValidationState, InputSize } from '../Input/Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  validationState?: InputValidationState;
  size?: InputSize;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { validationState = 'default', size = 'md', resize = 'vertical', fullWidth, className, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={classNames(
        'med-textarea',
        `med-textarea--size-${size}`,
        `med-textarea--state-${validationState}`,
        `med-textarea--resize-${resize}`,
        fullWidth && 'med-textarea--full-width',
        className,
      )}
      {...rest}
    />
  );
});

export { Textarea };
export default Textarea;