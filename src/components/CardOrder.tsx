import { AddressTypes, OrderTypes, ProductTypes } from "../@types/data_types";
import { BtnTrash } from "./BtnTrash";
import { BtnEdit } from "./BtnEdit";
import { useEffect, useState } from "react";
import { getAddress } from "../services/AddressService";
import { getProduct } from "../services/ProductService";
import { FiMapPin, FiCalendar } from "react-icons/fi";

export type CardOrderType = {
  data: OrderTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const CardOrder = ({ data, onDelete, onUpdate }: CardOrderType) => {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const [address, setAddress] = useState<AddressTypes | null>(null);
  const [product, setProduct] = useState<ProductTypes | null>(null);

  async function fetchData() {
    setAddress(await getAddress(data.shippingAddressId));
    setProduct(await getProduct(data.productId));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-80 h-82 justify-between bg-white rounded-2xl p-2.5 font-body shadow-md">
      <div className="flex flex-col h-full pl-2">
        <h1 className="text-md font-body font-semibold text-primary w-full">
          {product?.name}
        </h1>
        <span className="w-5/6 self-center bg-secundary border rounded-xl my-2"></span>
        <span className="flex flex-row justify-between text-sm font-body text-primary w-full">
          <h2 className="font-medium">Qtd.: {data.amount}</h2>
          <h2 className="font-semibold">
            Total: {formatter.format(data.totalPrice)}
          </h2>
        </span>
        <span className="w-5/6 self-center bg-secundary border rounded-xl my-2"></span>
        <span className="flex flex-row items-start  mt-2 gap-2">
          <FiMapPin size={22} className="stroke-pink-600/60" />
          <span className="text-sm font-body font-medium text-primary w-full">
            {`${address?.street}, Nº ${address?.number}, ${
              address?.complement ? address?.complement + "," : ""
            } ${address?.neighborhood}, ${address?.state}, ${
              address?.country
            }, ${address?.postalCode}.`}
          </span>
        </span>
        <span className="flex flex-row mt-2 justify-between text-sm font-body font-medium text-primary w-full">
          <h2 className="flex flex-row  gap-2">
            <FiCalendar size={22} className="stroke-pink-600/60" />
            Data prevista:{" "}
          </h2>
          <span>{new Date(data.expectedDate!).toISOString().substring(0, 10)}</span>
        </span>
        <span className="flex flex-row mt-2 justify-between text-sm font-body font-medium text-primary w-full">
        <h2 className="flex flex-row  gap-2">
            <FiCalendar size={22} className="stroke-pink-600/60" />
            Data da entrega:{" "}
          </h2>
          {data.deliveryDate ? (
            <span>{new Date(data.deliveryDate!).toISOString().substring(0, 10)}</span>
          ) : null}
        </span>
        <span className="w-5/6 self-center bg-secundary border rounded-xl my-2"></span>
        <span className="flex flex-row justify-between text-sm font-body font-medium text-primary w-full">
          <h2>Status: </h2>
          <span className="font-semibold">{data.status}</span>
        </span>
      </div>
      <span className="flex flex-row mt-2 gap-2 items-center justify-center rounded-md w-full  ">
        <BtnTrash onClick={onDelete} />
        <BtnEdit onClick={onUpdate} />
      </span>
    </div>
  );
};
