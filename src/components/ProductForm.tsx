import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { ProductTypes } from "../@types/data_types";
import { createProduct, updateProduct } from "../services/ProductService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./Button";
import { useState } from "react";

const productSchema = yup.object({
  name: yup
    .string()
    .required("O nome do produto é obrigatório!")
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),
  description: yup
    .string()
    .required("A descrição é obrigatória!")
    .trim()
    .min(30, "A descrição deve ter pelo menos 30 caracteres"),
  price: yup.string().required("O preço é obrigatório"),
  amount: yup.number().required("A quantidade é obrigatória."),
  categoryId: yup.number().required("O ID da categoria é obrigatório."),
  supplierId: yup.number().required("A ID do fornecedor é obrigatório."),
});

type ProductFormType = {
  product?: ProductTypes | null;
  edit?: boolean;
  setRefresh: () => void;
};

export const ProductForm = ({ product, edit, setRefresh }: ProductFormType) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductTypes>({
    resolver: yupResolver(productSchema),
  });

  const notifySuccess = () =>
    toast.success(
      edit ? "Produto editado com sucesso!" : "Produto cadastrado com sucesso!",
      {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  const notifyError = () =>
    toast.error(
      edit ? "Erro ao editar o produto." : "Erro ao cadastrar o produto.",
      {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  async function onSubmit(data: ProductTypes) {
    try {
      setIsLoading(true);

      if (edit) {
        const response = await updateProduct({
          id: product?.id,
          name: data.name,
          description: data.description,
          price: parseFloat(data.price!.toString().replace(",", ".")),
          amount: data.amount,
          categoryId: data.categoryId,
          supplierId: data.supplierId,
        });

        if (response === 200) {
          notifySuccess();
        }

        setRefresh();
      } else {
        const response = await createProduct({
          name: data.name,
          description: data.description,
          price: parseFloat(data.price.toString().replace(",", ".")),
          amount: data.amount,
          categoryId: data.categoryId,
          supplierId: data.supplierId,
        });

        if (response.status === 200) {
          notifySuccess();
        }
        setRefresh();
      }
    } catch (error) {
      notifyError();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col px-36">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-lg"
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <Input
              title="Nome do Produto"
              placeholder="Nome do Produto"
              maxLength={45}
              defaultValue={product?.name}
              onChange={onChange}
              className={
                errors.name?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange } }) => (
            <Input
              title="Descrição"
              placeholder="Descrição"
              defaultValue={product?.description}
              onChange={onChange}
              className={
                errors.description?.message
                  ? "border-red-700"
                  : "border-gray-400"
              }
              errorMessage={errors.description?.message}
            />
          )}
        />
        <span className="flex w-full gap-2">
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange } }) => (
              <Input
                title="Preço"
                placeholder="Preço"
                currency
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                allowNegativeValue={false}
                defaultValue={product?.price}
                onValueChange={onChange}
                className={
                  errors.price?.message ? "border-red-700" : "border-gray-400"
                }
                errorMessage={errors.price?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange } }) => (
              <Input
                title="Quantidade em estoque"
                placeholder="Quantidade em estoque"
                defaultValue={product?.amount}
                onChange={onChange}
                type="number"
                min={0}
                className={
                  errors.amount?.message ? "border-red-700" : "border-gray-400"
                }
                errorMessage={errors.amount?.message}
              />
            )}
          />
        </span>
        <span className="flex w-full gap-2">
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange } }) => (
              <Input
                title="ID da Categoria"
                placeholder="ID da Categoria"
                defaultValue={product?.categoryId}
                onChange={onChange}
                type="number"
                min={1}
                className={
                  errors.categoryId?.message
                    ? "border-red-700"
                    : "border-gray-400"
                }
                errorMessage={errors.categoryId?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="supplierId"
            render={({ field: { onChange } }) => (
              <Input
                title="ID do Fornecedor"
                placeholder="ID do Fornecedor"
                defaultValue={product?.supplierId}
                onChange={onChange}
                type="number"
                min={1}
                className={
                  errors.supplierId?.message
                    ? "border-red-700"
                    : "border-gray-400"
                }
                errorMessage={errors.supplierId?.message}
              />
            )}
          />
        </span>

        <Button
          type="submit"
          title={edit ? "Editar" : "Cadastrar"}
          className="self-end w-64 h-10 mt-2"
          isLoading={isLoading}
        />
      </form>
      <ToastContainer />
    </div>
  );
};
