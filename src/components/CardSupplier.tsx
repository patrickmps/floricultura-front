import {
  FiTrash,
  FiEdit,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { SupplierTypes } from "../@types/data_types";

export type CardSupplierType = {
  data: SupplierTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const CardSupplier = ({ data, onDelete, onUpdate }: CardSupplierType) => {

  return (
    <div className="flex flex-col w-80 h-60 justify-between bg-white rounded-2xl p-2.5 font-body shadow-md">
      <div className="flex flex-col">
        <h1 className="mt-2 ml-2 text-lg font-semibold text-primary">{data.name}</h1>
        <span className="w-5/6 self-center bg-secundary border rounded-xl my-1"></span>
        <span className="flex flex-row items-center ml-2 mt-2 gap-2">
          <FiMail size={22} className="stroke-pink-600/60"/>
          <h2 className="text-md font-body font-medium text-primary">{data.email}</h2>
        </span>
        <span className="flex flex-row items-center ml-2 mt-2 gap-2">
          <FiPhone size={22} className="stroke-pink-600/60"/>
          <h2 className="text-md font-body font-medium text-primary">{data.phone}</h2>
        </span>
        <span className="flex flex-row items-center ml-2 mt-2 gap-2">
          <FiMapPin size={22} className="stroke-pink-600/60"/>
          <h2 className="text-md font-body font-medium text-primary">{'{ COLOCAR ENDEREÇO }'}</h2>
        </span>
      </div>
      

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
