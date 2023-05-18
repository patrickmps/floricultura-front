import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { Button } from "../components/Button";
import { CategoryTypes } from "../@types/data_types";
// import { CategoryForm } from "../components/CategoryForm";
import { CardCategory } from "../components/CardCategory";
import { deleteCategory, getCategories } from "../services/CategoryService";
import { CategoryForm } from "../components/CategoryForm";

export const Category = () => {
  const [addresses, setCategoryes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshCategoryes, setRefreshCategoryes] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState<CategoryTypes | null>(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
    setCategoryEdit(null);
  }

  async function fetchData() {
    const data = await getCategories();
    setCategoryes(data.reverse());
  }

  useEffect(() => {
    fetchData();
  }, [refreshCategoryes]);

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
        {addresses &&
          addresses.map((supplier: CategoryTypes) => (
            <CardCategory
              data={supplier}
              key={supplier.id}
              onDelete={async () => {
                await deleteCategory(supplier.id!);
                setRefreshCategoryes(!refreshCategoryes);
              }}
              onUpdate={() => {
                setIsEdit(true);
                setCategoryEdit(supplier);
                openModal();
                setRefreshCategoryes(!refreshCategoryes);
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
          {isEdit ? "Editar Categoria" : "Cadastrar Categoria"}
        </h1>
        <CategoryForm
          edit={isEdit}
          category={categoryEdit}
          setRefresh={() => setRefreshCategoryes(!refreshCategoryes)}
        />
      </Modal>
    </div>
  );
};
