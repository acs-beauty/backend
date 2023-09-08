import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api/admin/", //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get('getAllCategories'),
  
  addCategory: (data) => http.post('addCategory', data),
  
  updateCategory: (data) => http.patch(`updateCategory`, data),
  
  deleteCategory: (id) => http.delete(`category/${id}`, id),
}
