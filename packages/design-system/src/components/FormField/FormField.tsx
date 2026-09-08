import * as React from 'react';
import classNames from 'classnames';
import { Label } from '../Label/Label';

export type FieldValidationState = 'default' | 'error' | 'success' | 'warning';
export type FieldOrientation = 'vertical' | 'horizontal';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text label for the field. */
  label?: React.ReactNode;
  /** HTML `for` attribute — connect to the control id. */
  htmlFor?: string;
  /** Renders the label as a child element. When set, do not pass label. */
  asChild?: boolean;
  required?: boolean;
  /** Description shown under the control. */
  description?: React.ReactNode;
  /** Helper text shown under the control. */
  helperText?: React.ReactNode;
  /** Error message shown when the field is invalid. */
  errorMessage?: React.ReactNode;
  /** Validation state. */
  validationState?: FieldValidationState;
  /** Orientation of label vs control. */
  orientation?: FieldOrientation;
  /** Unique id used to generate aria-describedby references. */
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    label,
    htmlFor,
    asChild,
    required,
    description,
    helperText,
    errorMessage,
    validationState = 'default',
    orientation = 'vertical',
    id,
    size = 'md',
    className,
    children,
    ...rest
  },
  ref,
) {
  const baseId = id ?? htmlFor ?? React.useId();
  const descriptionId = `${baseId}-description`;
  const helperId = `${baseId}-helper`;
  const errorId = `${baseId}-error`;
  const hasError = validationState === 'error' || Boolean(errorMessage);

  // The control must receive these aria attributes. We clone the child to
  // forward them automatically.
  const control = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<{
        id?: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
        'aria-required'?: boolean;
      }>, {
        id: baseId,
        'aria-describedby':
          [hasError ? errorId : null, description ? descriptionId : null, helperText ? helperId : null]
            .filter(Boolean)
            .join(' ') || undefined,
        'aria-invalid': hasError || undefined,
        'aria-required': required || undefined,
      })
    : children;

  return (
    <div
      ref={ref}
      className={classNames(
        'med-form-field',
        `med-form-field--${orientation}`,
        `med-form-field--state-${validationState}`,
        className,
      )}
      {...rest}
    >
      {label && !asChild ? (
        <Label htmlFor={htmlFor ?? baseId} required={required} size={size}>
          {label}
        </Label>
      ) : null}
      {asChild && label ? label : null}
      {control}
      {description ? (
        <div id={descriptionId} className="med-form-field__description">
          {description}
        </div>
      ) : null}
      {helperText ? (
        <div id={helperId} className="med-form-field__helper">
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className="med-form-field__error" role="alert">
          {errorMessage ?? validationState}
        </div>
      ) : null}
    </div>
  );
});

export { FormField };
export default FormField;