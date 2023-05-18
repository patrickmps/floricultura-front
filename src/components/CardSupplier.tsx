import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { AddressTypes, SupplierTypes } from "../@types/data_types";
import { BtnTrash } from "./BtnTrash";
import { BtnEdit } from "./BtnEdit";
import { useEffect, useState } from "react";
import { getAddress } from "../services/AddressService";

export type CardSupplierType = {
  data: SupplierTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const CardSupplier = ({
  data,
  onDelete,
  onUpdate,
}: CardSupplierType) => {

  const [address, setAddress] = useState<AddressTypes | null>(null);

  async function fetchData() {
    setAddress(await getAddress(data.addressId))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col w-80 h-72 justify-between bg-white rounded-2xl p-2.5 font-body shadow-md">
      <div className="flex flex-col">
        <h1 className="mt-2 ml-2 text-lg font-semibold text-primary">
          {data.name}
        </h1>
        <span className="w-5/6 self-center bg-secundary border rounded-xl my-1"></span>
        <span className="flex flex-row items-center ml-2 mt-2 gap-2">
          <FiMail size={22} className="stroke-pink-600/60" />
          <h2 className="text-md font-body font-medium text-primary">
            {data.email}
          </h2>
        </span>
        <span className="flex flex-row items-center ml-2 mt-2 gap-2">
          <FiPhone size={22} className="stroke-pink-600/60" />
          <h2 className="text-md font-body font-medium text-primary">
            {data.phone}
          </h2>
        </span>
        <span className="flex flex-row items-center ml-2 mt-2 gap-2">
          <FiMapPin size={22} className="stroke-pink-600/60" />
          <h2 className="text-md font-body font-medium text-primary w-full">
          {`${address?.street}, Nº ${address?.number}, ${address?.complement ? address?.complement + ',' : ''} ${address?.neighborhood}, ${address?.state}, ${address?.country}, ${address?.postalCode}.`}
          </h2>
        </span>
      </div>

      <span className="flex flex-row mt-2 gap-2 items-center justify-center rounded-md w-full  ">
        <BtnTrash onClick={onDelete} />
        <BtnEdit onClick={onUpdate} />
      </span>
    </div>
  );
};
