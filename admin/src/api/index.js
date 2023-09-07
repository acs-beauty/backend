import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api/admin/", //заменить адрес на константу (.env)
});

export const getCategories = () => http.get('/category');

export const addCategory = (data) => http.post('/category', data);

export const updateCategory = ({id, data}) => http.patch(`/category/${id}`, data);

export const deleteCategory = (id) => http.delete(`/category/${id}`, id)