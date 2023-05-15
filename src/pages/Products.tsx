import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { Card } from "../components/Card";
import Modal from "react-modal";
import {
  deleteProduct,
  getProducts,
} from "../services/ProductService";
import { ProductForm } from "../components/ProductForm";
import { Button } from "../components/Button";
import { ProductTypes } from "../@types/data_types";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [productEdit, setProductEdit] = useState<ProductTypes | null>(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
    setProductEdit(null);
  }

  async function fetchData() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    fetchData();
  }, [refreshProducts]);

  return (
    <div className="flex flex-col px-36">
      <span className="flex flex-row justify-between items-center">
        <h1 className="py-5 font-semibold text-2xl text-primary font-title">
          Plantas
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
        {products &&
          products.map((product: ProductTypes) => (
            <Card
              data={product}
              key={product.id}
              onDelete={async () => {
                await deleteProduct(product.id!)
               setRefreshProducts(!refreshProducts)
              }}
              onUpdate={() => {
                setIsEdit(true);
                setProductEdit(product);
                openModal();
                setRefreshProducts(!refreshProducts)
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
            padding: 0
          }
        }}
        className="flex flex-col h-5/6 w-2/4 rounded-xl self-center justify-self-center bg-primary/80 border border-gray-300 justify-center items-center "
      >
        <FiX size={32} onClick={closeModal} className="stroke-red-700 cursor-pointer fixed top-5 right-10"/>
        <h1 className="font-title text-2xl font-bold text-primary">
          {isEdit ? "Editar Produto" : "Cadastrar Produto"}
        </h1>
        <ProductForm edit={isEdit} product={productEdit} setRefresh={() => setRefreshProducts(!refreshProducts)}  />
      </Modal>
    </div>
  );
};
