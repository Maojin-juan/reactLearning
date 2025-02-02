import { useState, useCallback, useEffect } from "react";
import { productAPI } from "@/services/product";

export const useImageUpload = (initialImagesUrl, setImagesUrl, setError) => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(initialImagesUrl)) {
      const initialImages = initialImagesUrl.map((url, index) => ({
        id: index.toString(),
        preview: url,
        progress: 100,
        status: "complete",
        type: "url",
        url,
      }));
      setImages(initialImages);
    }
  }, [initialImagesUrl]);

  const validateImage = (file) => {
    const maxSize = 3 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return "只支援 JPG、PNG、GIF 與 WebP 格式";
    }

    if (file.size > maxSize) {
      return "檔案大小不能超過 3MB";
    }

    return null;
  };

  const processFiles = useCallback(
    (files) => {
      const newImages = [];
      const errors = [];

      Array.from(files).forEach((file) => {
        const error = validateImage(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          newImages.push({
            file,
            id: Math.random().toString(36).substr(2, 9),
            preview: URL.createObjectURL(file),
            progress: 0,
            status: "pending",
            type: "file",
          });
        }
      });

      if (errors.length > 0) {
        setError(errors.join("\n"));
      } else {
        setError("");
        setImages((prev) => [...prev, ...newImages]);
        newImages.forEach((image) => simulateUpload(image.id));
      }
    },
    [setError, setImages],
  );

  const simulateUpload = useCallback(
    async (imageId) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId
              ? {
                  ...img,
                  progress,
                  status: progress === 100 ? "complete" : "uploading",
                }
              : img,
          ),
        );

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);

      const image = images.find((img) => img.id === imageId);
      if (image?.type === "file") {
        try {
          const response = await productAPI.uploadImage(image.file);
          // 更新圖片狀態
          setImages((prev) =>
            prev.map((img) =>
              img.id === imageId
                ? {
                    ...img,
                    url: response.imageUrl,
                    status: "complete",
                    progress: 100,
                  }
                : img,
            ),
          );

          // 修改這裡：直接傳入新的陣列，而不是使用函數形式
          const updatedUrls = [...imagesUrl, response.imageUrl];
          setImagesUrl(updatedUrls);
        } catch (error) {
          console.error("上傳圖片失敗:", error);
          setError("上傳圖片失敗");
        }
      }
    },
    [images, setError, setImages, setImagesUrl, imagesUrl],
  );

  const handleDrop = useCallback((e) => {
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileUpload = useCallback((e) => {
    processFiles(e.target.files);
  }, []);

  const removeImage = useCallback(
    (imageId) => {
      const imageIndex = images.findIndex((img) => img.id === imageId);
      if (imageIndex !== -1) {
        const newImages = images.filter((img) => img.id !== imageId);
        setImages(newImages);
        const urls = newImages.map((img) => img.url);
        setImagesUrl(urls); // 移出 setImages callback
      }
    },
    [images, setImagesUrl],
  );

  return {
    images,
    handleDrop,
    handleFileUpload,
    removeImage,
    isDragging,
    setIsDragging,
    setImages,
  };
};
