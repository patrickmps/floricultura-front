import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { Button } from "../components/Button";
import { AddressTypes, SupplierTypes } from "../@types/data_types";
import { SupplierForm } from "../components/SupplierForm";
import { CardSupplier } from "../components/CardSupplier";
import { deleteSupplier, getSuppliers } from "../services/SupplierService";
import { getAddresses } from "../services/AddressService";

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshSuppliers, setRefreshSuppliers] = useState(false);
  const [suppliertEdit, setSupplierEdit] = useState<SupplierTypes | null>(null);
  const [addressesOptions, setAddressesOptions] = useState([
    { label: "", value: null },
  ]);

  function openModal() {
    setModalIsOpen(true);
    fetchAddresses();
  }

  function closeModal() {
    setModalIsOpen(false);
    setSupplierEdit(null);
    setAddressesOptions([{ label: "", value: null }]);
  }

  async function fetchData() {
    const data = await getSuppliers();
    setSuppliers(data.reverse());
  }

  async function fetchAddresses() {
    const data = await getAddresses();
    const addresses = data.map((address: AddressTypes) => ({
      label: `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.postalCode}.`,
      value: address.id,
    }));
    setAddressesOptions(addresses);
  }

  useEffect(() => {
    fetchData();
  }, [refreshSuppliers]);

  return (
    <div className="flex flex-col px-36 overflow-y-scroll mb-10">
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
        {suppliers &&
          suppliers.map((supplier: SupplierTypes) => (
            <CardSupplier
              data={supplier}
              key={supplier.id}
              onDelete={async () => {
                await deleteSupplier(supplier.id!);
                setRefreshSuppliers(!refreshSuppliers);
              }}
              onUpdate={() => {
                setIsEdit(true);
                setSupplierEdit(supplier);
                openModal();
                setRefreshSuppliers(!refreshSuppliers);
              }}
            />
          ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
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
          {isEdit ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
        </h1>
        <SupplierForm
          edit={isEdit}
          addressesOptions={addressesOptions}
          supplier={suppliertEdit}
          setRefresh={() => setRefreshSuppliers(!refreshSuppliers)}
        />
      </Modal>
    </div>
  );
};
