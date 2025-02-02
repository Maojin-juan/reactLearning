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

  updateProductData: async (id, formData, modalType) => {
    const url =
      modalType === "edit"
        ? `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/product/${id}`
        : `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/product`;

    const productData = {
      data: {
        ...formData,
        origin_price: Number(formData.origin_price),
        price: Number(formData.price),
        is_enabled: formData.is_enabled ? true : false,
        imagesUrl: formData.imagesUrl,
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

  getProductPages: async (page) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/products?page=${page}`,
      );
      return response.data;
    } catch (error) {
      console.error("獲取產品頁數失敗:", error);
      throw error;
    }
  },

  uploadImage: async (formData, onProgress) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(progress);
        },
      });

      if (!response.ok) {
        throw new Error("上傳失敗");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("上傳失敗：" + error.message);
    }
  },

  // uploadImage: async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}/admin/upload`,
  //       formData,
  //       // {
  //       //   headers: {
  //       //     "Content-Type": "multipart/form-data",
  //       //   },
  //       // },
  //     );
  //     console.log("上傳圖片成功");
  //     return response.data;
  //   } catch (error) {
  //     console.error("上傳圖片失敗:", error);
  //     throw error;
  //   }
  // },
};
