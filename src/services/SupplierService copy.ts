import { SupplierTypes } from "../@types/data_types";
import { api } from "./api";

async function createSupplier(data: SupplierTypes) {

  const response = await api.post('/supplier', data)
  return response
}

async function getSuppliers() {
  const response = await api.get("/suppliers");
  return response.data
}

async function getSupplier( id: number) {
  const response = await api.get(`/supplier?id=${id}`);
  return response.data
}

async function updateSupplier(data: SupplierTypes) {
  const response = await api.put('/supplier', data);
  return response.status
}

async function deleteSupplier(id: number) {
  const response = await api.delete(`/supplier?id=${id}`);
  console.log(response.status)
  return response.status
}

export { createSupplier, getSuppliers, getSupplier, updateSupplier, deleteSupplier }