import classNames from "classnames";
import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, ...rest }, ref) => {
    return (
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id={id || label}
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className={classNames(
              "h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800",
              className
            )}
            ref={ref}
            {...rest}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={id || label} className="font-medium text-gray-900">
            {label}
          </label>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Input";
