import { clientAPI } from "@/utils/axiosClient";

export const clientProductAPI = {
  // 取得所有產品
  getProducts: () => clientAPI.get("/products"),

  // 取得單一產品
  getProduct: (id) => clientAPI.get(`/product/${id}`),

  // 分頁取得產品
  getProductPages: (page = 1, category = "") => {
    const params = new URLSearchParams();
    params.append("page", page);
    if (category) params.append("category", category);
    return clientAPI.get(`/products?${params.toString()}`);
  },

  // 取得產品分類
  getCategories: () => clientAPI.get("/products/categories"),
};
