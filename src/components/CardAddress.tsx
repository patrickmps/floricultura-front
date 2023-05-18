import { FiMapPin } from "react-icons/fi";
import { AddressTypes } from "../@types/data_types";
import { BtnTrash } from "./BtnTrash";
import { BtnEdit } from "./BtnEdit";

export type CardAddressType = {
  data: AddressTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const CardAddress = ({ data, onDelete, onUpdate }: CardAddressType) => {

  return (
    <div className="flex flex-col w-80 h-48 justify-between bg-white rounded-2xl p-2.5 font-body shadow-md">
      <span className="flex flex-row items-start ml-2 mt-2 gap-2">
        <FiMapPin size={22} className="stroke-pink-600/60" />
        <span className="text-md font-body font-medium text-primary w-full">
          {`${data.street}, Nº ${data.number}, ${data.complement ? data.complement + ',' : ''} ${data.neighborhood}, ${data.state}, ${data.country}, ${data.postalCode}.`}
        </span>
      </span>

      <span className="flex flex-row mt-2 gap-2 items-center justify-center rounded-md w-full  ">
        <BtnTrash onClick={onDelete} />
        <BtnEdit onClick={onUpdate} />
      </span>
    </div>
  );
};
