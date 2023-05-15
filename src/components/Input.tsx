import { InputHTMLAttributes } from "react";
import CurrencyInput, {CurrencyInputProps} from "react-currency-input-field";

type InputTypes = InputHTMLAttributes<HTMLInputElement> & CurrencyInputProps & {
  errorMessage?: string | null;
  currency?: boolean;
};

export const Input = ({ errorMessage, currency, ...props }: InputTypes) => {
  return (
    <div className="flex flex-col w-full">
      <label
        className="font-medium font-body text-primary"
        htmlFor={props.title}
      >
        {props.title}
      </label>

      {!currency ? (
        <input
          {...props}
          className={
            "appearance-none border rounded-lg w-auto py-2 px-3 text-primary font-body mb-1 focus:outline-none focus:shadow-outline " +
            props.className
          }
        />
      ) : (
        <CurrencyInput
          {...props}
          className={
            "appearance-none border border-gray-400 rounded-lg w-auto py-2 px-3 text-primary font-body mb-1 focus:outline-none focus:shadow-outline " +
            props.className
          }
        />
      )}

      <p className="text-sm text-red-700 font-body font-medium mb-1">
        {errorMessage ?? null}
      </p>
    </div>
  );
};
