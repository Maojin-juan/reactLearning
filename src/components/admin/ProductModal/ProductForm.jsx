import PropTypes from "prop-types";
import { Label, Input, Textarea, Checkbox } from "@/components/ui";
import MultiImageUpload from "@/components/admin/ImageUpload";
import StarRating from "@/components/admin/StartRating";

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
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxClick = (id) => {
    setFormData((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-3">
          <Label htmlFor="imageUrl">請輸入主圖網址</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="請輸入圖片連結"
          />
          <img
            className="mx-auto mt-4 size-48 rounded-full"
            src={formData.imageUrl}
            alt="主圖"
          />

          <MultiImageUpload
            imagesUrl={formData?.imagesUrl || []}
            onImagesChange={(urls) =>
              setFormData((prev) => ({ ...prev, imagesUrl: urls }))
            }
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="col-span-12 sm:col-span-6">
        {renderField(FORM_FIELDS.basic)}
        <div className="mb-3">
          <Label htmlFor="rating">星級</Label>
          <StarRating
            rating={formData.rating}
            setRating={(rating) => setFormData((prev) => ({ ...prev, rating }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FORM_FIELDS.grid1.map((field) => renderField(field))}
          {FORM_FIELDS.grid2.map((field) => renderField(field))}
        </div>
        <hr />
        {FORM_FIELDS.textarea.map((field) => renderField(field, Textarea))}
        <div className="mt-3 flex items-center gap-2">
          <Checkbox
            id="is_enabled"
            onCheckedChange={() => handleCheckboxClick("is_enabled")}
            checked={formData.is_enabled}
          />
          <Label htmlFor="is_enabled">是否啟用</Label>
        </div>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ProductForm;
