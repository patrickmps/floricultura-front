import { FiBox } from "react-icons/fi";
import { CategoryTypes } from "../@types/data_types";
import { BtnTrash } from "./BtnTrash";
import { BtnEdit } from "./BtnEdit";

export type CardCategoryType = {
  data: CategoryTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const CardCategory = ({ data, onDelete, onUpdate }: CardCategoryType) => {

  return (
    <div className="flex flex-col w-80 h-32 justify-between bg-white rounded-2xl p-2.5 font-body shadow-md">
      <span className="flex flex-row items-start ml-2 mt-2 gap-2">
        <FiBox size={22} className="stroke-pink-600/60" />
        <span className="text-md font-body font-semibold text-primary w-full">
          {data.category}
        </span>
      </span>

      <span className="flex flex-row mt-2 gap-2 items-center justify-center rounded-md w-full  ">
        <BtnTrash onClick={onDelete} />
        <BtnEdit onClick={onUpdate} />
      </span>
    </div>
  );
};
