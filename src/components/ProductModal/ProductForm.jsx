import PropTypes from "prop-types";
import { Label, Input, Textarea, Checkbox, Button } from "@/components/ui";
import { useEffect } from "react";

const IMAGE_CONFIG = { MAX: 5, MIN: 1 };
const FORM_FIELDS = {
  basic: {
    id: "title",
    label: "標題",
    type: "text",
    placeholder: "請輸入標題",
  },
  grid1: [
    { id: "category", label: "分類", type: "text", placeholder: "請輸入分類" },
    { id: "unit", label: "單位", type: "text", placeholder: "請輸入單位" },
  ],
  grid2: [
    {
      id: "origin_price",
      label: "原價",
      type: "number",
      min: "0",
      placeholder: "請輸入原價",
    },
    {
      id: "price",
      label: "售價",
      type: "number",
      min: "0",
      placeholder: "請輸入售價",
    },
  ],
  textarea: [
    { id: "description", label: "產品描述", placeholder: "請輸入產品描述" },
    { id: "content", label: "說明內容", placeholder: "請輸入說明內容" },
  ],
};

function ProductForm({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxClick = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: !prevData[id],
    }));
  };

  const handleImageChange = (index, value) => {
    setFormData((prev) => {
      const images = [...prev.imagesUrl];
      images[index] = value;

      if (
        value &&
        index === images.length - 1 &&
        images.length < IMAGE_CONFIG.MAX
      ) {
        images.push("");
      }

      if (images.length > IMAGE_CONFIG.MIN && !images[images.length - 1]) {
        images.pop();
      }

      return { ...prev, imagesUrl: images };
    });
  };

  const renderField = ({ id, label, ...props }, Component = Input) => (
    <div className="mb-3" key={id}>
      <Label htmlFor={id}>{label}</Label>
      <Component
        id={id}
        value={formData[id]}
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-6 overflow-y-auto p-6">
      {/* Image Section */}
      <div className="col-span-12 sm:col-span-4">
        <div className="mb-3">
          <Label htmlFor="imageUrl">輸入圖片網址</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="請輸入圖片連結"
          />
          <img className="mt-4" src={formData.imageUrl} alt="主圖" />
        </div>
        {formData.imagesUrl.map((image, index) => (
          <div key={index} className="mb-4">
            <Input
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`圖片網址 ${index + 1}`}
            />
            {image && (
              <img src={image} alt={`副圖 ${index + 1}`} className="mt-4" />
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            className="w-full whitespace-normal"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                imagesUrl: [...prev.imagesUrl, ""],
              }))
            }
          >
            新增圖片
          </Button>
          {formData.imagesUrl.length > 0 && (
            <Button
              className="w-full whitespace-normal bg-red-600"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  imagesUrl: prev.imagesUrl.slice(0, -1),
                }))
              }
            >
              取消圖片
            </Button>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="col-span-12 sm:col-span-8">
        {renderField(FORM_FIELDS.basic)}
        <div className="grid grid-cols-2 gap-4">
          {FORM_FIELDS.grid1.map((field) => renderField(field))}
          {FORM_FIELDS.grid2.map((field) => renderField(field))}
        </div>
        <hr />
        {FORM_FIELDS.textarea.map((field) => renderField(field, Textarea))}
        <div className="mt-3 flex items-center gap-2">
          <Checkbox
            id="is_enabled"
            onClick={() => handleCheckboxClick("is_enabled")}
          />
          <Label htmlFor="is_enabled">是否啟用</Label>
        </div>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ProductForm;
