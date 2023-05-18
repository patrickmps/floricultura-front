import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { OrderTypes, ProductTypes } from "../@types/data_types";
import { createOrder, updateOrder } from "../services/OrderService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./Button";
import { useState } from "react";
import { SelectInput } from "./SelectInput";
import { updateProduct } from "../services/ProductService";

const orderSchema = yup.object({
  status: yup.string(),
  expectedDate: yup.date(),
  deliveryDate: yup.date(),
});

type OrderFormType = {
  order?: OrderTypes;
  product?: ProductTypes;
  edit?: boolean;
  addressesOptions?: { label: string; value: any }[];
  setRefresh: () => void;
};

export const OrderForm = ({
  order,
  product,
  edit,
  setRefresh,
  addressesOptions,
}: OrderFormType) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderTypes>({
    resolver: yupResolver(orderSchema),
  });

  const statusOptions = [
    { label: "Processando", value: "processing" },
    { label: "Pendente", value: "pending" },
    { label: "Enviado", value: "shipped" },
    { label: "Entregue", value: "delivered" },
    { label: "Cancelado", value: "canceled" },
  ];

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
      edit ? "Erro ao editar o pedido." : "Erro ao cadastrar o pedido.",
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

  async function onSubmit(data: OrderTypes) {
    try {
      setIsLoading(true);

      if (edit) {
        const response = await updateOrder({
          id: order?.id,
          amount: data.amount,
          productId: data.productId,
          totalPrice: data.totalPrice,
          shippingAddressId: data.shippingAddressId,
          status: data.status,
          expectedDate: new Date(
            data?.expectedDate ?? order?.expectedDate
          ).toISOString(),
          deliveryDate: new Date(
            (data?.deliveryDate ?? order?.deliveryDate)! ?? null
          )?.toISOString(),
        });

        if (response === 200) {
          notifySuccess();
        }

        setRefresh();
      } else {
        const response = await createOrder({
          amount: order!.amount,
          productId: order!.productId,
          totalPrice: order!.totalPrice,
          shippingAddressId: data.shippingAddressId,
          status: order!.status,
          expectedDate: new Date(order?.expectedDate!).toISOString(),
          deliveryDate: new Date(order?.deliveryDate! ?? null)?.toISOString(),
        });

        if (response.status === 200) {
          await updateProduct({
            id: order?.productId,
            amount: (product?.amount! - order!.amount)
          })
          notifySuccess();
        }
        setRefresh();
      }
    } catch (error) {
      console.log(error);
      notifyError();
    } finally {
      setIsLoading(false);
    }
  }

  return edit ? (
    <div className="flex flex-col px-36">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-lg"
      >
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange } }) => (
            <SelectInput
              options={statusOptions}
              title="Status do pedido"
              placeholder="Status do pedido"
              defaultValue={order?.status}
              onChange={onChange}
              className={
                errors.status?.message ? "border-red-700" : "border-gray-400"
              }
              errorMessage={errors.status?.message}
            />
          )}
        />
        <span className="flex w-full gap-2">
          <Controller
            control={control}
            name="expectedDate"
            render={({ field: { onChange } }) => (
              <Input
                title="Data prevista"
                placeholder="Data prevista"
                defaultValue={new Date(order?.expectedDate! ?? null)
                  .toISOString()
                  .substring(0, 10)}
                onChange={onChange}
                type="date"
                min={0}
                className={
                  errors.expectedDate?.message
                    ? "border-red-700"
                    : "border-gray-400"
                }
                errorMessage={errors.expectedDate?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="deliveryDate"
            render={({ field: { onChange } }) => (
              <Input
                title="Data da entrega"
                placeholder="Data da entrega"
                defaultValue={new Date(order?.deliveryDate! ?? null)
                  .toISOString()
                  .substring(0, 10)}
                onChange={onChange}
                type="date"
                min={0}
                className={
                  errors.deliveryDate?.message
                    ? "border-red-700"
                    : "border-gray-400"
                }
                errorMessage={errors.deliveryDate?.message}
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
  ) : (
    <div className="flex flex-col px-36">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-lg"
      >
        <Controller
          control={control}
          name="shippingAddressId"
          render={({ field: { onChange } }) => (
            <SelectInput
              options={addressesOptions!}
              title="Endereço de entrega"
              placeholder="Endereço de entrega"
              defaultValue={order?.shippingAddressId}
              onChange={onChange}
              className={
                errors.shippingAddressId?.message
                  ? "border-red-700"
                  : "border-gray-400"
              }
              errorMessage={errors.shippingAddressId?.message}
            />
          )}
        />

        <Button
          type="submit"
          title={"Finalizar"}
          className="self-end w-64 h-10 mt-2"
          isLoading={isLoading}
        />
      </form>
      <ToastContainer />
    </div>
  );
};
