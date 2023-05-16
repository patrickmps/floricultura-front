import {
  FiTrash,
  FiEdit,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { AddressTypes } from "../@types/data_types";

export type CardAddressType = {
  data: AddressTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const CardAddress = ({ data, onDelete, onUpdate }: CardAddressType) => {

  return (
    <div className="flex flex-col w-80 h-60 justify-between bg-white rounded-2xl p-2.5 font-body shadow-md">
      <h1>{data.street}</h1>

      <span className="flex flex-row mt-2 gap-2 items-center justify-center rounded-md w-full  ">
        <button onClick={onDelete} className="flex row w-full h-7 justify-center items-center rounded-md bg-red-800 shadow-sm hover:opacity-75 hover:scale-105 transition-all text-xs text-white">
          <FiTrash size={14}/>
        </button>
        <button onClick={onUpdate} className="flex felx-row w-full h-7 justify-center items-center rounded-md bg-gray-400 shadow-sm hover:opacity-75 hover:scale-105 transition-all text-xs text-white">
          <FiEdit size={14}/>
        </button>
      </span>
    </div>
  );
};
