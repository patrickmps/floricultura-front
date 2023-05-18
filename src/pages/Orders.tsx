import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { CardOrder } from "../components/CardOrder";
import Modal from "react-modal";
import { deleteOrder, getOrders } from "../services/OrderService";
import { OrderForm } from "../components/OrderForm";
import { OrderTypes } from "../@types/data_types";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [orderEdit, setOrderEdit] = useState<OrderTypes | null>(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setOrderEdit(null);
  }

  async function fetchData() {
    const data = await getOrders();
    setOrders(data.reverse());
  }

  useEffect(() => {
    fetchData();
  }, [refreshOrders]);

  return (
    <div className="flex flex-col px-36 overflow-y-scroll mb-10">
      <span className="flex flex-row justify-between items-center">
        <h1 className="py-5 font-semibold text-2xl text-primary font-title">
          Plantas
        </h1>
        {/* <Button
          className="w-28 h-8"
          title="Adicionar"
          onClick={() => {
            setIsEdit(false);
            openModal();
          }}
        /> */}
      </span>
      <div className="grid grid-flow-row-dense grid-cols-3 gap-5 h-full w-full items-center justify-center 2xl:grid-cols-4">
        {orders &&
          orders.map((order: OrderTypes) => (
            <CardOrder
              data={order}
              key={order.id}
              onDelete={async () => {
                await deleteOrder(order.id!);
                setRefreshOrders(!refreshOrders);
              }}
              onUpdate={() => {
                setIsEdit(true);
                setOrderEdit(order);
                openModal();
                setRefreshOrders(!refreshOrders);
              }}
            />
          ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        ariaHideApp={false}
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
          {isEdit ? "Editar Produto" : "Cadastrar Produto"}
        </h1>
        <OrderForm
          edit={isEdit}
          order={orderEdit!}
          setRefresh={() => setRefreshOrders(!refreshOrders)}
        />
      </Modal>
    </div>
  );
};
