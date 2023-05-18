import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { AddressTypes } from "../@types/data_types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./Button";
import { useState } from "react";
import { createAddress, updateAddress } from "../services/AddressService";

const addressSchema = yup.object({
  street: yup
    .string()
    .required("A rua é obrigatória!")
    .trim()
    .min(2, "O nome da rua deve ter pelo menos 2 caracteres."),
  number: yup.number().required("O Nº é obrigatório."),
  complement: yup.string().required("O complemento é obrigatório!").trim(),
  neighborhood: yup
    .string()
    .required("O bairro é obrigatório.")
    .trim()
    .min(2, "O nome do bairro deve ter pelo menos 2 caracteres."),
  city: yup
    .string()
    .required("A cidade é obrigatório.")
    .trim()
    .min(2, "O nome da cidade deve ter pelo menos 2 caracteres."),
  state: yup
    .string()
    .required("O estado é obrigatório.")
    .trim()
    .min(2, "O nome do estado deve ter pelo menos 2 caracteres."),
  country: yup
    .string()
    .required("O país é obrigatório.")
    .trim()
    .min(2, "O nome do país deve ter pelo menos 2 caracteres."),
  postalCode: yup
    .string()
    .required("O CEP é obrigatório.")
    .trim()
    .min(8, "O nome do CEP deve ter pelo 8 caracteres."),
});

type AddressFormType = {
  address?: AddressTypes | null;
  edit?: boolean;
  setRefresh: () => void;
};

export const AddressForm = ({ address, edit, setRefresh }: AddressFormType) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressTypes>({
    resolver: yupResolver(addressSchema),
  });

  const notifySuccess = () =>
    toast.success(
      edit
        ? "Endereço editado com sucesso!"
        : "Endereço cadastrado com sucesso!",
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
      edit ? "Erro ao editar o endereço." : "Erro ao cadastrar o endereço.",
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

  async function onSubmit(data: AddressTypes) {
    console.log(data)
    try {
      setIsLoading(true);

      if (edit) {
        const response = await updateAddress({
          id: address?.id,
          street: data.street,
          number: data.number,
          complement: data.complement,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
        });

        if (response === 200) {
          notifySuccess();
        }

        setRefresh();
      } else {
        const response = await createAddress({
          street: data.street,
          number: data.number,
          complement: data.complement,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
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
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-lg"
      >
        <Controller
          control={control}
          name="street"
          render={({ field: { onChange } }) => (
            <Input
              title="Rua"
              placeholder="Rua"
              maxLength={45}
              defaultValue={address?.street}
              onChange={onChange}
              className={
                errors.street?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.street?.message}
            />
          )}
        />

        <span className="flex w-full gap-2">
          <Controller
            control={control}
            name="neighborhood"
            render={({ field: { onChange } }) => (
              <Input
                title="Bairro"
                placeholder="Bairro"
                defaultValue={address?.neighborhood}
                onChange={onChange}
                type="tel"
                maxLength={11}
                className={
                  errors.neighborhood?.message
                    ? "border-red-700"
                    : "border-gray-400"
                }
                errorMessage={errors.neighborhood?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="number"
            render={({ field: { onChange } }) => (
              <Input
                title="Nº"
                placeholder="Nº"
                defaultValue={address?.number}
                onChange={onChange}
                type="number"
                min={1}
                className={
                  errors.number?.message ? "border-red-700" : "border-gray-400"
                }
                errorMessage={errors.number?.message}
              />
            )}
          />
        </span>

        <Controller
          control={control}
          name="complement"
          render={({ field: { onChange } }) => (
            <Input
              title="Complemento"
              placeholder="Complemento"
              defaultValue={address?.complement}
              onChange={onChange}
              className={
                errors.complement?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.complement?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange } }) => (
            <Input
              title="Cidade"
              placeholder="Cidade"
              defaultValue={address?.city}
              onChange={onChange}
              className={
                errors.city?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.city?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="state"
          render={({ field: { onChange } }) => (
            <Input
              title="Estado"
              placeholder="Estado"
              defaultValue={address?.state}
              onChange={onChange}
              className={
                errors.state?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.state?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange } }) => (
            <Input
              title="País"
              placeholder="País"
              defaultValue={address?.country}
              onChange={onChange}
              className={
                errors.country?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.country?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="postalCode"
          render={({ field: { onChange } }) => (
            <Input
              title="CEP"
              placeholder="CEP"
              defaultValue={address?.postalCode}
              inputMode="numeric"
              minLength={8}
              maxLength={8}
              onChange={onChange}
              className={
                errors.postalCode?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.postalCode?.message}
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
