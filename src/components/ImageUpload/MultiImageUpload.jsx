import { useState, useCallback, useEffect } from "react";
import { Upload, X, AlertCircle, Link, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { productAPI } from "@/services/product";
import PropTypes from "prop-types";

const MultiImageUpload = ({ imagesUrl = [], setImagesUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (Array.isArray(imagesUrl)) {
      const initialImages = imagesUrl.map((url, index) => ({
        id: `initial-${index}`,
        preview: url,
        progress: 100,
        status: "complete",
        type: "url",
        url,
      }));
      setImages(initialImages);
    }
  }, []);

  useEffect(() => {
    const urls = images
      .filter((img) => img.status === "complete")
      .map((img) => img.url);
    setImagesUrl(urls);
  }, [images, setImagesUrl]);

  const validateImage = (file) => {
    const maxSize = 3 * 1024 * 1024; // 3MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return "只支援 JPG、PNG、GIF 與 WebP 格式";
    }

    if (file.size > maxSize) {
      return "檔案大小不能超過 3MB";
    }

    return null;
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const processFiles = async (files) => {
    const newImages = [];
    const errors = [];

    for (const file of Array.from(files)) {
      const error = validateImage(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
        continue;
      }

      const imageId = Math.random().toString(36).substr(2, 9);
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

    // First add all pending images
    setImages((prev) => [...prev, ...newImages]);

    // Then process uploads
    for (const newImage of newImages) {
      try {
        // Set uploading status
        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id
              ? { ...img, status: "uploading", progress: 50 }
              : img,
          ),
        );

        // Upload image
        const response = await productAPI.uploadImage(newImage.file);

        // Update image with upload result
        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id
              ? {
                  ...img,
                  url: response.imageUrl, // 注意這裡使用 response.imageUrl
                  status: "complete",
                  progress: 100,
                }
              : img,
          ),
        );
      } catch (error) {
        console.error("上傳圖片失敗:", error);
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
  };

  const handleUrlSubmit = (e) => {
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
    setImageUrl("");
    setShowUrlInput(false);
    setError("");
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileUpload = (e) => {
    processFiles(e.target.files);
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <div
        className={`relative border-2 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-dashed"
        } rounded-lg p-8 transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          multiple
        />

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4 md:flex-col">
            <div className="text-center">
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer flex-col items-center rounded-lg p-4 hover:bg-gray-50"
              >
                <Upload className="mb-2 h-12 w-12 text-gray-400" />
                <span className="font-medium text-blue-500">上傳圖片</span>
                <span className="text-sm text-gray-500">支援多張上傳</span>
              </label>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowUrlInput(true)}
                className="flex flex-col items-center rounded-lg p-4 hover:bg-gray-50"
              >
                <Link className="mb-2 h-12 w-12 text-gray-400" />
                <span className="font-medium text-blue-500">圖片網址</span>
                <span className="text-sm text-gray-500">輸入圖片連結</span>
              </button>
            </div>
          </div>

          {showUrlInput && (
            <form onSubmit={handleUrlSubmit} className="flex gap-2 sm:flex-col">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="請輸入圖片網址"
                className="flex-1 rounded-md border p-2"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                新增
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUrlInput(false);
                  setImageUrl("");
                }}
                className="rounded-md border px-4 py-2 hover:bg-gray-50"
              >
                取消
              </button>
            </form>
          )}

          {images.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="relative">
                    <img
                      src={image.preview}
                      alt={image.type === "url" ? "圖片網址" : "上傳圖片"}
                      className="h-40 w-full rounded-lg object-cover"
                    />
                    {image.type === "url" && (
                      <span className="absolute -left-1 -top-3 z-10 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                        URL
                      </span>
                    )}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-1 opacity-0 shadow-lg transition-opacity hover:bg-gray-50 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {image.status !== "complete" && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-40">
                      <div className="w-3/4">
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${image.progress}%` }}
                          />
                        </div>
                        <p className="mt-2 text-center text-sm text-white">
                          {image.progress}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {images.length < 9 && !showUrlInput && (
                <button
                  onClick={() => setShowUrlInput(true)}
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:bg-gray-50"
                >
                  <Plus className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">新增圖片</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-line">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

MultiImageUpload.propTypes = {
  imagesUrl: PropTypes.array.isRequired,
  setImagesUrl: PropTypes.func.isRequired,
};

export default MultiImageUpload;
