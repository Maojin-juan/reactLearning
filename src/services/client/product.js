import axios from "axios";

export const productAPI = {
  getProduct: async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/product/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("API 錯誤:", error.response.data);
      throw error;
    }
  },
};
