import { CategoryTypes } from "../@types/data_types";
import { api } from "./api";

async function createCategory(data: CategoryTypes) {

  const response = await api.post('/category', data)
  return response
}

async function getCategories() {
  const response = await api.get("/categories");
  return response.data
}

async function getCategory( id: number) {
  const response = await api.get(`/category?id=${id}`);
  return response.data
}

async function updateCategory(data: CategoryTypes) {
  const response = await api.put('/category', data);
  return response.status
}

async function deleteCategory(id: number) {
  const response = await api.delete(`/category?id=${id}`);
  console.log(response.status)
  return response.status
}

export { createCategory, getCategories, getCategory, updateCategory, deleteCategory }