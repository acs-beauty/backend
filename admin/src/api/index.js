import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api/admin/", //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get('getAllCategories'),
  
  addCategory: (data) => http.post('addCategory', data),

  addSubcategory: (data) => http.post('addSubcategory', data),
  
  updateCategory: (data) => http.patch('updateCategory', data),

  updateSubcategory: (data) => http.patch('updateSubcategory', data),
  
  deleteCategory: (id) => http.delete(`category/${id}`, id),

  deleteSubcategory: (id) => http.delete(`subcategory/${id}`, id)
}
