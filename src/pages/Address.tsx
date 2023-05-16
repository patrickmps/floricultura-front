import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { Button } from "../components/Button";
import { AddressTypes } from "../@types/data_types";
import { AddressForm } from "../components/AddressForm";
import { CardAddress } from "../components/CardAddress";
import { deleteAddress, getAddresses } from "../services/AddressService";

export const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshAddresses, setRefreshAddresses] = useState(false);
  const [suppliertEdit, setAddressEdit] = useState<AddressTypes | null>(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
    setAddressEdit(null);
  }

  async function fetchData() {
    const data = await getAddresses();
    setAddresses(data);
  }

  useEffect(() => {
    fetchData();
  }, [refreshAddresses]);

  return (
    <div className="flex flex-col px-36">
      <span className="flex flex-row justify-between items-center">
        <h1 className="py-5 font-semibold text-2xl text-primary font-title">
          Fornecedores
        </h1>
        <Button
          className="w-28 h-8"
          title="Adicionar"
          onClick={() => {
            setIsEdit(false);
            openModal();
          }}
        />
      </span>
      <div className="grid grid-flow-row-dense grid-cols-3 gap-5 h-full w-full items-center justify-center 2xl:grid-cols-4">
        {addresses &&
          addresses.map((supplier: AddressTypes) => (
            <CardAddress
              data={supplier}
              key={supplier.id}
              onDelete={async () => {
                await deleteAddress(supplier.id!);
                setRefreshAddresses(!refreshAddresses);
              }}
              onUpdate={() => {
                setIsEdit(true);
                setAddressEdit(supplier);
                openModal();
                setRefreshAddresses(!refreshAddresses);
              }}
            />
          ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
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
        className="flex flex-col h-5/6 w-2/4 rounded-xl self-center justify-self-center bg-primary/80 border border-gray-300 justify-center items-center overflow-y-scroll overflow-x-hidden"
      >
        <FiX
          size={32}
          onClick={closeModal}
          className="stroke-red-700 cursor-pointer fixed top-5 right-10"
        />
        <h1 className="font-title text-2xl font-bold text-primary mt-10">
          {isEdit ? "Editar Endereço" : "Cadastrar Endereço"}
        </h1>
        <AddressForm
          edit={isEdit}
          address={suppliertEdit}
          setRefresh={() => setRefreshAddresses(!refreshAddresses)}
        />
      </Modal>
    </div>
  );
};
