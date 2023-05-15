import { ProductTypes } from "../@types/data_types";
import { api } from "./api";

async function createProduct(data: ProductTypes) {

  const response = await api.post('/product', data)
  return response
}

async function getProducts() {
  const response = await api.get("/products");
  return response.data
}

async function getProduct( id: number) {
  const response = await api.get(`/product?id=${id}`);
  return response.data
}

async function updateProduct(data: ProductTypes) {
  const response = await api.put('/product', data);
  return response.status
}

async function deleteProduct(id: number) {
  const response = await api.delete(`/product?id=${id}`);
  console.log(response.status)
  return response.status
}

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct }