import { useState, useCallback, useEffect, useRef } from "react";
import { productAPI } from "@/services/product";

export const useImageUpload = (initialImagesUrl, onImagesChange, setError) => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);
  const isUpdatingRef = useRef(false);

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
    async (files) => {
      const newImages = [];
      const errors = [];
      const UPLOAD_TIME = 2000; // 模擬上傳時間為2秒
      const STEPS = 20; // 分20步完成
      const INTERVAL_TIME = UPLOAD_TIME / STEPS;

      // 驗證並準備檔案
      for (const file of Array.from(files)) {
        const error = validateImage(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
          continue;
        }

        const imageId = Math.random().toString(36).slice(2, 9);
        const newImage = {
          file,
          id: imageId,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "pending",
          type: "file",
        };

        newImages.push(newImage);
      }

      // 先新增待處理的圖片
      setImages((prev) => [...prev, ...newImages]);

      // 逐一處理上傳
      for (const newImage of newImages) {
        let progress = 0;
        const progressTimer = setInterval(() => {
          progress += 10;
          if (progress <= 90) {
            setImages((prev) =>
              prev.map((img) =>
                img.id === newImage.id ? { ...img, progress: progress } : img,
              ),
            );
          }
        }, INTERVAL_TIME);

        try {
          // 呼叫 API 上傳
          const response = await productAPI.uploadImage(newImage.file);
          clearInterval(progressTimer);

          setImages((prev) => {
            const updatedImages = prev.map((img) =>
              img.id === newImage.id
                ? {
                    ...img,
                    url: response.imageUrl,
                    status: "complete",
                    progress: 100,
                  }
                : img,
            );

            // 僅在上傳完成時更新一次
            if (!isUpdatingRef.current) {
              isUpdatingRef.current = true;
              setTimeout(() => {
                const completedUrls = updatedImages
                  .filter((img) => img.status === "complete")
                  .map((img) => img.url);
                onImagesChange(completedUrls);
                isUpdatingRef.current = false;
              }, 0);
            }

            return updatedImages;
          });
        } catch (error) {
          console.error("上傳圖片失敗:", error);
          clearInterval(progressTimer);
          setImages((prev) =>
            prev.map((img) =>
              img.id === newImage.id
                ? { ...img, status: "error", progress: 0 }
                : img,
            ),
          );
          errors.push(`${newImage.file.name}: 上傳失敗`);
        }
      }

      if (errors.length > 0) {
        setError(errors.join("\n"));
      }
    },
    [setImages, setError, onImagesChange],
  );

  const handleDrop = useCallback(
    (e) => {
      processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const handleFileUpload = useCallback(
    (e) => {
      processFiles(e.target.files);
    },
    [processFiles],
  );

  const removeImage = useCallback(
    (imageId) => {
      const imageIndex = images.findIndex((img) => img.id === imageId);
      if (imageIndex !== -1) {
        const newImages = images.filter((img) => img.id !== imageId);
        setImages(newImages);
        const urls = newImages.map((img) => img.url);
        onImagesChange(urls);
      }
    },
    [images, onImagesChange],
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
