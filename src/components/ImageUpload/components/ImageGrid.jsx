import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import ImageItem from "./ImageItem";

const ImageGrid = ({ images, removeImage, showUrlInput, setShowUrlInput }) => {
  if (!images.length) return null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} onRemove={removeImage} />
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
  );
};

ImageGrid.propTypes = {
  images: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired,
  showUrlInput: PropTypes.bool.isRequired,
  setShowUrlInput: PropTypes.func.isRequired,
};

export default ImageGrid;
