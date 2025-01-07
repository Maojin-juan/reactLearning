import axios from "axios";

export const productAPI = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/products`,
    );
    return response.data;
  } catch (error) {
    console.error("API 錯誤:", error);
    throw error;
  }
};
