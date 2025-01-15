import PropTypes from "prop-types";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Input,
  Button,
  Textarea,
  Checkbox,
} from "@/components/ui";

function ProductModal({ title, formData, setFormData, modalType }) {
  const handleModalInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    setFormData((prevData) => {
      const newImages = [...prevData.imagesUrl];
      newImages[index] = value;

      if (
        value !== "" &&
        index === newImages.length - 1 &&
        newImages.length < 5
      ) {
        newImages.push("");
      }

      if (newImages.length > 1 && newImages[newImages.length - 1] === "") {
        newImages.pop();
      }

      return { ...prevData, imagesUrl: newImages };
    });
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      imagesUrl: [...prevData.imagesUrl, ""],
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => {
      const newImages = [...prevData.imagesUrl];
      newImages.pop();
      return { ...prevData, imagesUrl: newImages };
    });
  };

  if (!formData) {
    return null;
  }

  return (
    <DialogContent className="h-4/5 gap-0 p-0">
      <DialogHeader className="border border-b p-6">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="hidden">
          This is a hidden description to avoid warnings.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-12 gap-6 overflow-y-auto p-6">
        <div className="col-span-12 sm:col-span-4">
          <div className="mb-2">
            <div className="mb-3">
              <Label htmlFor="imageUrl" className="form-label">
                輸入圖片網址
              </Label>
              <Input
                type="text"
                className="form-control"
                id="imageUrl"
                placeholder="請輸入圖片連結"
                value={formData.imageUrl}
                onChange={handleModalInputChange}
              />
            </div>
            <img className="img-fluid" src={formData.imageUrl} alt="主圖" />
          </div>
          <div>
            {formData.imagesUrl.map((image, index) => (
              <div key={index} className="mb-2">
                <Input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`圖片網址 ${index + 1}`}
                  className="form-control mb-2"
                />
                {image && (
                  <img
                    src={image}
                    alt={`副圖 ${index + 1}`}
                    className="img-preview mb-2"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2">
              {formData.imagesUrl.length < 5 &&
                formData.imagesUrl[formData.imagesUrl.length - 1] !== "" && (
                  <Button
                    className="w-full whitespace-normal"
                    onClick={handleAddImage}
                  >
                    新增圖片
                  </Button>
                )}

              {formData.imagesUrl.length >= 1 && (
                <Button
                  className="w-full whitespace-normal bg-red-600"
                  onClick={handleRemoveImage}
                >
                  取消圖片
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-8">
          <div className="mb-3">
            <Label htmlFor="title" className="form-label">
              標題
            </Label>
            <Input
              id="title"
              type="text"
              className="form-control"
              placeholder="請輸入標題"
              value={formData.title}
              onChange={handleModalInputChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Label htmlFor="category" className="form-label">
                分類
              </Label>
              <Input
                id="category"
                type="text"
                className="form-control"
                placeholder="請輸入分類"
                value={formData.category}
                onChange={handleModalInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label htmlFor="unit" className="form-label">
                單位
              </Label>
              <Input
                id="unit"
                type="text"
                className="form-control"
                placeholder="請輸入單位"
                value={formData.unit}
                onChange={handleModalInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Label htmlFor="origin_price" className="form-label">
                原價
              </Label>
              <Input
                id="origin_price"
                type="number"
                min="0"
                className="form-control"
                placeholder="請輸入原價"
                value={formData.origin_price}
                onChange={handleModalInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label htmlFor="price" className="form-label">
                售價
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                className="form-control"
                placeholder="請輸入售價"
                value={formData.price}
                onChange={handleModalInputChange}
              />
            </div>
          </div>
          <hr />
          <div className="mb-3">
            <Label htmlFor="description" className="form-label">
              產品描述
            </Label>
            <Textarea
              id="description"
              className="form-control"
              placeholder="請輸入產品描述"
              value={formData.description}
              onChange={handleModalInputChange}
            ></Textarea>
          </div>
          <div className="mb-3">
            <Label htmlFor="content" className="form-label">
              說明內容
            </Label>
            <Textarea
              id="content"
              className="form-control"
              placeholder="請輸入說明內容"
              value={formData.content}
              onChange={handleModalInputChange}
            ></Textarea>
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_enabled"
                checked={formData.is_enabled}
                onChange={handleModalInputChange}
              />
              <Label className="form-check-label" htmlFor="is_enabled">
                是否啟用
              </Label>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="border border-t p-6">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            取消
          </Button>
        </DialogClose>
        {modalType === "delete" ? (
          <DialogClose asChild>
            <Button type="button">刪除</Button>
          </DialogClose>
        ) : (
          <DialogClose asChild>
            <Button type="button">確認</Button>
          </DialogClose>
        )}
      </DialogFooter>
    </DialogContent>
  );
}

ProductModal.propTypes = {
  title: PropTypes.string,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  modalType: PropTypes.string,
};

export default ProductModal;
