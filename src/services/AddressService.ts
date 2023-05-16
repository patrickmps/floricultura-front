import { AddressTypes } from "../@types/data_types";
import { api } from "./api";

async function createAddress(data: AddressTypes) {

  const response = await api.post('/address', data)
  return response
}

async function getAddresses() {
  const response = await api.get("/addresses");
  return response.data
}

async function getAddress( id: number) {
  const response = await api.get(`/address?id=${id}`);
  return response.data
}

async function updateAddress(data: AddressTypes) {
  const response = await api.put('/address', data);
  return response.status
}

async function deleteAddress(id: number) {
  const response = await api.delete(`/address?id=${id}`);
  console.log(response.status)
  return response.status
}

export { createAddress, getAddresses, getAddress, updateAddress, deleteAddress }