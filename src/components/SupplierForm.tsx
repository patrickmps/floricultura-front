import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { SupplierTypes } from "../@types/data_types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./Button";
import { useState } from "react";
import { createSupplier, updateSupplier } from "../services/SupplierService";
import { SelectInput } from "./SelectInput";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const supplierSchema = yup.object({
  name: yup
    .string()
    .required("O nome do fornecedor é obrigatório!")
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),
  addressId: yup.number().required("O ID da endereço é obrigatório."),
  email: yup
    .string()
    .email("Deve ser um email. Ex: email@example.com")
    .required("o email é obrigatório!"),
  phone: yup
    .string()
    .required("O número de telefone é obrigatório!")
    .min(10, "O número de telefone deve ter pelo menos 10 números.")
    .max(11, "O telefone deve ter no máximo 11 números.")
    .matches(phoneRegExp, "Este número de telefone não é válido!"),
});

type SupplierFormType = {
  supplier?: SupplierTypes | null;
  edit?: boolean;
  setRefresh: () => void;
  addressesOptions: { label: string; value: any }[];
};

export const SupplierForm = ({
  supplier,
  edit,
  setRefresh,
  addressesOptions,
}: SupplierFormType) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierTypes>({
    resolver: yupResolver(supplierSchema),
  });

  const notifySuccess = () =>
    toast.success(
      edit
        ? "Fornecedor editado com sucesso!"
        : "Fornecedor cadastrado com sucesso!",
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
      edit ? "Erro ao editar o fornecedor." : "Erro ao cadastrar o fornecedor.",
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

  async function onSubmit(data: SupplierTypes) {
    try {
      setIsLoading(true);

      if (edit) {
        const response = await updateSupplier({
          id: supplier?.id,
          name: data.name,
          addressId: data.addressId,
          email: data.email,
          phone: data.phone,
        });

        if (response === 200) {
          notifySuccess();
        }

        setRefresh();
      } else {
        const response = await createSupplier({
          name: data.name,
          addressId: data.addressId,
          email: data.email,
          phone: data.phone,
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
              title="Nome do Fornecedor"
              placeholder="Nome do Fornecedor"
              maxLength={45}
              defaultValue={supplier?.name}
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
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              title="Email"
              placeholder="email@example.com"
              defaultValue={supplier?.email}
              onChange={onChange}
              type="email"
              className={
                errors.email?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange } }) => (
            <Input
              title="Telefone"
              placeholder="XXXXXXXXXXX"
              defaultValue={supplier?.phone}
              onChange={onChange}
              type="tel"
              maxLength={11}
              className={
                errors.phone?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="addressId"
          render={({ field: { onChange } }) => (
            <SelectInput
              options={addressesOptions}
              title="Endereço"
              placeholder="Endereço"
              defaultValue={supplier?.addressId}
              onChange={onChange}
              className={
                errors.addressId?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.addressId?.message}
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
