import { FiTrash } from "react-icons/fi";

export const BtnTrash = ({ ...props }) => {
  return (
    <button
      {...props}
      className="flex row w-full h-7 justify-center items-center rounded-md border-2 border-red-700 shadow-sm hover:bg-red-100 hover:scale-105 transition-all text-xs text-red-700"
    >
      <FiTrash size={14} />
    </button>
  );
};
