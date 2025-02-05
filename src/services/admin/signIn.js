import { authAPI } from "@/utils/axiosClient";

export const signInAPI = {
  checkAuth: async () => {
    try {
      return await authAPI.post("/user/check");
    } catch (error) {
      console.error("驗證失敗:", error);
      throw error;
    }
  },

  signIn: async (formData) => {
    try {
      const response = await authAPI.post("/admin/signin", formData);
      return response;
    } catch (error) {
      console.error("登入失敗:", error);
      throw error;
    }
  },
};
