import { useState, useCallback } from "react";

export const useUrlInput = (
  images,
  setImagesUrl,
  setShowUrlInput,
  setError,
  setImages,
) => {
  const [imageUrl, setImageUrl] = useState("");

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateUrl(imageUrl)) {
        setError("請輸入有效的圖片網址");
        return;
      }

      const newImage = {
        id: Math.random().toString(36).substr(2, 9),
        preview: imageUrl,
        progress: 100,
        status: "complete",
        type: "url",
        url: imageUrl,
      };

      setImages((prev) => [...prev, newImage]);
      setImagesUrl((prev) => [...prev, imageUrl]);
      setImageUrl("");
      setShowUrlInput(false);
      setError("");
    },
    [imageUrl, setError, setImages, setImagesUrl, setShowUrlInput],
  );

  return { handleUrlSubmit, imageUrl, setImageUrl };
};
