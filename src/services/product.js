import axios from "axios";

export const productAPI = {
  getProducts: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/products`,
      );
      return response.data;
    } catch (error) {
      console.error("API 錯誤:", error);
      throw error;
    }
  },

  updateProductData: async (id, templateData, modalType) => {
    const url =
      modalType === "edit"
        ? `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/product/${id}`
        : `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/product`;

    const productData = {
      data: {
        ...templateData,
        origin_price: Number(templateData.origin_price),
        price: Number(templateData.price),
        is_enabled: templateData.is_enabled ? 1 : 0,
        imagesUrl: templateData.imagesUrl,
      },
    };

    try {
      let response;
      if (modalType === "edit") {
        response = await axios.put(url, productData);
        console.log("更新成功", response.data);
      } else {
        response = await axios.post(url, productData);
        console.log("新增成功", response.data);
      }

      return response.data;
    } catch (err) {
      console.error(
        modalType === "edit" ? "更新失敗" : "新增失敗",
        err.response.data.message,
      );
      throw err;
    }
  },

  delProductData: async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/product/${id}`,
      );
      console.log("刪除成功", response.data);
      return response.data;
    } catch (err) {
      console.error("刪除失敗", err.response.data.message);
      throw err;
    }
  },
};
