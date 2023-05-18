import {
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import Modal from "react-modal";
import Flower from "../assets/flower-gray.png";
import { useEffect, useState } from "react";
import { AddressTypes, CategoryTypes, ProductTypes, SupplierTypes } from "../@types/data_types";
import { BtnTrash } from "./BtnTrash";
import { BtnEdit } from "./BtnEdit";
import { getCategory } from "../services/CategoryService";
import { getSupplier } from "../services/SupplierService";
import { OrderForm } from "./OrderForm";
import { getAddresses } from "../services/AddressService";

export type CardType = {
  data: ProductTypes;
  onDelete?: () => void;
  onUpdate?: () => void;
  setRefreshProducts: () => void;
};

export const Card = ({ data, onDelete, onUpdate, setRefreshProducts }: CardType) => {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const [category, setCategory] = useState<CategoryTypes | null>(null);
  const [supplier, setSupplier] = useState<SupplierTypes | null>(null);
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [addressesOptions, setAddressesOptions] = useState([
    { label: "", value: null },
  ]);


  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
    fetchAddresses();
  }
  
  function closeModal() {
    setModalIsOpen(false);
    setAddressesOptions([{ label: "", value: null }]);
  }

  async function fetchAddresses() {
    const data = await getAddresses();
    const addresses = data.map((address: AddressTypes) => ({
      label: `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.postalCode}.`,
      value: address.id,
    }));
    setAddressesOptions(addresses);
  }


  async function fetchData() {
    setCategory(await getCategory(data.categoryId!))
    setSupplier(await getSupplier(data.supplierId!))
  }

  

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col w-80 h-82 bg-white rounded-2xl p-2.5 font-body shadow-md">
      <div className="flex flex-row">
        <img src={Flower} alt="" className="object-contain w-24 mr-3" />
        <div className="flex flex-col w-full">
          <h2 className="my-2.5 self-end text-lg font-semibold">
            {formatter.format(data.price!)}
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
                  orderAmount < data.amount!
                    ? setOrderAmount(orderAmount + 1)
                    : null;
                }}
              >
                <FiPlus size="12" className="stroke-white stroke-3" />
              </span>
            </div>
            <button onClick={openModal} className="flex row w-24 h-8 justify-center items-center rounded-md bg-pink-600 shadow-sm hover:opacity-75 hover:scale-105 transition-all">
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
      <span className="text-xs font-medium font-body text-primary">Categoria: {category?.category}</span>
      <span className="text-xs font-medium font-body text-primary">Fornecedor: {supplier?.name}</span>
      <p className="text-xs mt-2 text-justify font-normal w-full h-full max-h-full overflow-hidden text-ellipsis ">
        {data.description}
      </p>

      <span className="flex flex-row mt-2 gap-2 items-center justify-center rounded-md w-full  ">
        <BtnTrash onClick={onDelete} />
        <BtnEdit onClick={onUpdate}/>
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            display: "flex",
            width: "100%",
            justifyContent: "center",
          },
          content: {
            display: "flex",
            padding: 0,
          },
        }}
        className="flex flex-col h-5/6 w-2/4 rounded-xl self-center justify-self-center bg-primary/80 border border-gray-300 justify-center items-center "
      >
        <FiX
          size={32}
          onClick={closeModal}
          className="stroke-red-700 cursor-pointer fixed top-5 right-10"
        />
        <h1 className="font-title text-2xl font-bold text-primary">
          Realizar Pedido
        </h1>
        <OrderForm
          edit={false}
          product={data}
          order={{
            productId: data.id!,
            amount: orderAmount,
            totalPrice: (orderAmount * data.price!),
            status: 'pending',
            expectedDate: (new Date().setDate(new Date().getDate() + 5)),
            deliveryDate: null,
          }}
          setRefresh={setRefreshProducts} addressesOptions={addressesOptions} />
      </Modal>
    </div>
  );
};
