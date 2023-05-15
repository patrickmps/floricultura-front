import { ButtonHTMLAttributes } from "react";
import { ImSpinner9 } from "react-icons/im";

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button = ({ isLoading, ...props }: ButtonTypes) => {
  return (
    <button
      {...props}
      className={"flex flex-row justify-center items-center rounded-md bg-pink-600 text-base font-body font-medium text-white shadow-sm hover:opacity-75 hover:scale-105 transition-all disabled:opacity-75 disabled:hover:scale-100 " + props.className}
      disabled={isLoading}
    >
      {!isLoading ? props.title : (<ImSpinner9 className="animate-spin"/>)}
    </button>
  );
};
