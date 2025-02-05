import { adminAPI } from "@/utils/axiosClient";

export const productAPI = {
  // 取得產品列表
  getProducts: () => adminAPI.get("/products"),

  // 更新或新增產品
  updateProductData: (id, formData, modalType) => {
    const url = modalType === "edit" ? `/product/${id}` : "/product";
    const method = modalType === "edit" ? "put" : "post";
    return adminAPI[method](url, {
      data: {
        ...formData,
        origin_price: Number(formData.origin_price),
        price: Number(formData.price),
        is_enabled: Boolean(formData.is_enabled),
        imagesUrl: formData.imagesUrl,
      },
    });
  },

  // 刪除產品
  delProductData: (id) => adminAPI.delete(`/product/${id}`),

  // 分頁取得產品
  getProductPages: (page) => adminAPI.get(`/products?page=${page}`),

  // 上傳圖片
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return adminAPI.post("/upload", formData);
  },
};
