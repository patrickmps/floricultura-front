import { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

type SelectInputTypes = SelectHTMLAttributes<HTMLSelectElement> &
  OptionHTMLAttributes<HTMLOptionElement> & {
    errorMessage?: string | null;
    options: { label: string; value: any }[];
  };

export const SelectInput = ({
  errorMessage,
  options,
  ...props
}: SelectInputTypes) => {
  return (
    <div className="flex flex-col w-full">
      <label
        className="font-medium font-body text-primary"
        htmlFor={props.title}
      >
        {props.title}
      </label>
      <select
        {...props}
        className={
          "border rounded-lg w-auto text-primary font-body mb-1 p-2.5 " +
          props.className
        }
      >
        {props.defaultValue ?? <option selected>Selecione uma opção</option>}
        {options.map((option) => (
          <option value={option.value} selected={option.value === props.defaultValue} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
