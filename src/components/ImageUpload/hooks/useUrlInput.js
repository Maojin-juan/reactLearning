import { useState, useCallback } from "react";

export const useUrlInput = (
  imagesUrl,
  onImagesChange,
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
        id: Math.random().toString(36).slice(2, 9),
        preview: imageUrl,
        progress: 100,
        status: "complete",
        type: "url",
        url: imageUrl,
      };

      setImages((prev) => [...prev, newImage]);
      onImagesChange([...imagesUrl, imageUrl]);
      setImageUrl("");
      setShowUrlInput(false);
      setError("");
    },
    [imagesUrl, imageUrl, setError, setImages, onImagesChange, setShowUrlInput],
  );

  return { handleUrlSubmit, imageUrl, setImageUrl };
};
