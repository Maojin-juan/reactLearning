import axios from "axios";

export const signInAPI = {
  checkAuth: async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];

      console.log(token);

      if (token) {
        axios.defaults.headers.common.Authorization = token;
      } else {
        console.warn("Token not found");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/check`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  signIn: async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/signin`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("API 錯誤:", error);
      throw error;
    }
  },
};
