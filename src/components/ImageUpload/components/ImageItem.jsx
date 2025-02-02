import { X } from "lucide-react";
import PropTypes from "prop-types";

const ImageItem = ({ image, onRemove }) => {
  const handleRemove = (e) => {
    e.stopPropagation(); // 防止事件冒泡
    onRemove(image.id);
  };

  return (
    <div className="group relative">
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
          onClick={handleRemove}
          className="absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-1 opacity-0 shadow-lg transition-opacity hover:bg-gray-50 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

ImageItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ImageItem;
