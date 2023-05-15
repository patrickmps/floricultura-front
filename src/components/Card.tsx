import {
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiTrash,
  FiEdit,
} from "react-icons/fi";
import Flower from "../assets/flower-gray.png";
import { useState } from "react";
import { ProductTypes } from "../@types/data_types";

export type CardType = {
  data: ProductTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export const Card = ({ data, onDelete, onUpdate }: CardType) => {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const [orderAmount, setOrderAmount] = useState<number>(1);

  return (
    <div className="flex flex-col w-80 h-72 bg-white rounded-2xl p-2.5 font-body shadow-md">
      <div className="flex flex-row">
        <img src={Flower} alt="" className="object-contain w-24 mr-3" />
        <div className="flex flex-col w-full">
          <h2 className="my-2.5 self-end text-lg font-semibold">
            {formatter.format(data.price)}
          </h2>
          <span className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-row w-14 rounded-md h-5 justify-center items-center overflow-hidden shadow-sm select-none">
              <span
                className="flex h-full w-full bg-zinc-600 justify-center items-center cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => {
                  orderAmount > 1 ? setOrderAmount(orderAmount - 1) : null;
                }}
              >
                <FiMinus size="12" className="stroke-white stroke-3" />
              </span>
              <span className="flex h-full w-full bg-gray-100 justify-center items-center text-sm font-medium">
                {orderAmount}
              </span>
              <span
                className="flex h-full w-full bg-zinc-600 justify-center items-center cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => {
                  orderAmount < data.amount
                    ? setOrderAmount(orderAmount + 1)
                    : null;
                }}
              >
                <FiPlus size="12" className="stroke-white stroke-3" />
              </span>
            </div>
            <button className="flex row w-24 h-8 justify-center items-center rounded-md bg-pink-600 shadow-sm hover:opacity-75 hover:scale-105 transition-all">
              <FiPlus size="14" className="stroke-white stroke-3" />
              <FiShoppingCart size="20" className="stroke-white stroke-3" />
            </button>
          </span>
          <p className="text-xs font-light mt-1">
            Qtd. em estoque: {data.amount}
          </p>
        </div>
      </div>

      <h1 className="mt-2 text-md font-semibold">{data.name}</h1>
      <p className="text-xs text-justify font-normal w-full h-full max-h-full overflow-hidden text-ellipsis ">
        {data.description}
      </p>

      <span className="flex flex-row mt-1 gap-1 items-center justify-center rounded-md self-end justify-self-end ">
        <button onClick={onDelete} className="flex row w-10 h-6 justify-center items-center rounded-md bg-red-800 shadow-sm hover:opacity-75 hover:scale-105 transition-all text-xs text-white">
          <FiTrash />
        </button>
        <button onClick={onUpdate} className="flex felx-row w-10 h-6 justify-center items-center rounded-md bg-gray-400 shadow-sm hover:opacity-75 hover:scale-105 transition-all text-xs text-white">
          <FiEdit />
        </button>
      </span>
    </div>
  );
};
