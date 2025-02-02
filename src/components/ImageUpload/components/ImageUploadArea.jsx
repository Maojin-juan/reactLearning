import { Upload, Link } from "lucide-react";
import PropTypes from "prop-types";

const ImageUploadArea = ({
  isDragging,
  setIsDragging,
  handleDrop,
  handleFileUpload,
  setShowUrlInput,
  children,
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleDrop(e);
  };

  return (
    <div
      className={`relative border-2 ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-dashed"
      } rounded-lg p-4 transition-colors`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
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

        {children}
      </div>
    </div>
  );
};

ImageUploadArea.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  setIsDragging: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  setShowUrlInput: PropTypes.func.isRequired,
  showUrlInput: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default ImageUploadArea;
