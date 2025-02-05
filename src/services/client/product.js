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

  // 購物車相關 API
  getCart: async () => {
    try {
      const response = await clientAPI.get("/cart");
      return response;
    } catch (error) {
      console.error("取得購物車失敗:", error);
      throw error;
    }
  },

  updateCart: async (id, qty) => {
    try {
      const response = await clientAPI.put(`/cart/${id}`, {
        data: {
          product_id: id,
          qty,
        },
      });
      return response;
    } catch (error) {
      console.error("更新購物車失敗:", error);
      throw error;
    }
  },

  deleteCart: async (id) => {
    try {
      const response = await clientAPI.delete(`/cart/${id}`);
      return response;
    } catch (error) {
      console.error("刪除購物車項目失敗:", error);
      throw error;
    }
  },

  deleteCartAll: async () => {
    try {
      const response = await clientAPI.delete("/carts");
      return response;
    } catch (error) {
      console.error("清空購物車失敗:", error);
      throw error;
    }
  },

  addToCart: async (productId, qty) => {
    try {
      const response = await clientAPI.post("/cart", {
        data: {
          product_id: productId,
          qty,
        },
      });
      return response;
    } catch (error) {
      console.error("加入購物車失敗:", error);
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await clientAPI.post("/order", {
        data: orderData,
      });
      return response;
    } catch (error) {
      console.error("建立訂單失敗:", error);
      throw error;
    }
  },
};
