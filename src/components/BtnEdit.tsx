import { FiEdit } from "react-icons/fi";

export const BtnEdit = ({ ...props }) => {
  return (
    <button
      {...props}
      className="flex felx-row w-full h-7 justify-center items-center rounded-md border-2 border-gray-600  shadow-sm hover:bg-gray-100 hover:scale-105 transition-all text-xs text-gray-600"
    >
      <FiEdit size={14} />
    </button>
  );
};
