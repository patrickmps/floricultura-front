import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { CategoryTypes } from "../@types/data_types";
import { createCategory, updateCategory } from "../services/CategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./Button";
import { useState } from "react";

const categorySchema = yup.object({
  category: yup
    .string()
    .required("O nome do produto é obrigatório!")
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),
});

type CategoryFormType = {
  category?: CategoryTypes | null;
  edit?: boolean;
  setRefresh: () => void;
};

export const CategoryForm = ({
  category,
  edit,
  setRefresh,
}: CategoryFormType) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryTypes>({
    resolver: yupResolver(categorySchema),
  });

  const notifySuccess = () =>
    toast.success(
      edit ? "Produto editado com sucesso!" : "Produto cadastrado com sucesso!",
      {
        position: "top-center",
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
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  async function onSubmit(data: CategoryTypes) {
    try {
      setIsLoading(true);

      if (edit) {
        const response = await updateCategory({
          id: category?.id,
          category: data.category,
        });

        if (response === 200) {
          notifySuccess();
        }

        setRefresh();
      } else {
        const response = await createCategory({
          category: data.category,
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
          name="category"
          render={({ field: { onChange } }) => (
            <Input
              title="Categoria"
              placeholder="Categoria"
              maxLength={45}
              defaultValue={category?.category}
              onChange={onChange}
              className={
                errors.category?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.category?.message}
            />
          )}
        />

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
