import { OrderTypes } from "../@types/data_types";
import { api } from "./api";

async function createOrder(data: OrderTypes) {

  const response = await api.post('/order', data)
  return response
}

async function getOrders() {
  const response = await api.get("/orders");
  return response.data
}

async function getOrder( id: number) {
  const response = await api.get(`/order?id=${id}`);
  return response.data
}

async function updateOrder(data: OrderTypes) {
  const response = await api.put('/order', data);
  return response.status
}

async function deleteOrder(id: number) {
  const response = await api.delete(`/order?id=${id}`);
  console.log(response.status)
  return response.status
}

export { createOrder, getOrders, getOrder, updateOrder, deleteOrder }