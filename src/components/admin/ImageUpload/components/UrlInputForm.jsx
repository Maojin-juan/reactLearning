import PropTypes from "prop-types";

const UrlInputForm = ({
  imageUrl,
  setImageUrl,
  handleUrlSubmit,
  setShowUrlInput,
}) => {
  return (
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
  );
};

UrlInputForm.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  handleUrlSubmit: PropTypes.func.isRequired,
  setShowUrlInput: PropTypes.func.isRequired,
};

export default UrlInputForm;
