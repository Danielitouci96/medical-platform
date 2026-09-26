import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export interface StepperStep {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
}

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepperStep[];
  /** Index of the active (current) step. */
  activeStep: number;
  onStepClick?: (step: StepperStep, index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  /** Allow jumping to previously completed steps. */
  allowStepChange?: boolean;
  /** Hide numeric/completed icons (uses step numbers). */
  showIcons?: boolean;
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  {
    steps,
    activeStep,
    onStepClick,
    orientation = 'horizontal',
    allowStepChange,
    className,
    ...rest
  },
  ref,
) {
  return (
    <ol
      ref={ref}
      className={classNames('med-stepper', `med-stepper--${orientation}`, className)}
      {...rest}
    >
      {steps.map((step, i) => {
        const isComplete = i < activeStep;
        const isActive = i === activeStep;
        const isClickable = allowStepChange && (isComplete || isActive);

        return (
          <li
            key={step.id ?? i}
            className={classNames(
              'med-stepper__step',
              isComplete && 'med-stepper__step--complete',
              isActive && 'med-stepper__step--active',
              isClickable && 'med-stepper__step--clickable',
            )}
          >
            <button
              type="button"
              className="med-stepper__button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick?.(step, i)}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="med-stepper__indicator" aria-hidden="true">
                {isComplete ? <Icon name="Check" size="sm" /> : step.icon ? <Icon name={step.icon} size="sm" /> : i + 1}
              </span>
              <span className="med-stepper__text">
                <span className="med-stepper__label">
                  {step.label}
                  {isActive ? <span className="med-visually-hidden"> (current step)</span> : null}
                </span>
                {step.description ? <span className="med-stepper__description">{step.description}</span> : null}
              </span>
            </button>
            {i < steps.length - 1 ? <span className="med-stepper__connector" aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
});

export { Stepper };
export default Stepper;