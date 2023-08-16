import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: "normal" | "secondary";
};
export const Button = ({
  children,
  className,
  kind = "normal",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "rounded-md  block px-3 py-2 w-full text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ",
        {
          "bg-gray-50 hover:bg-gray-100 focus-visible:outline-gray-50 text-gray-700":
            kind === "normal",
          "bg-gray-800 hover:bg-gray-700 focus-visible:outline-gray-800 text-white":
            kind === "secondary",
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
