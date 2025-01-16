import { useState } from "react";
import PropTypes from "prop-types";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";
import ProductForm from "./ProductForm";

import { productAPI } from "@/services/product";

const initialFormData = {
  id: "",
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: false,
  imagesUrl: [],
};

function ProductModal({ title, modalType, setProducts }) {
  const [formData, setFormData] = useState(initialFormData);

  const onSubmit = async () => {
    await productAPI.updateProductData(formData.id, formData, modalType);
    const updatedProducts = await productAPI.getProducts();

    setProducts(updatedProducts.products);
  };

  return (
    <DialogContent className="h-5/6 gap-0 rounded-lg p-0">
      <DialogHeader className="justify-center rounded-t-lg border border-b p-6">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="hidden">
          This is a hidden description to avoid warnings.
        </DialogDescription>
      </DialogHeader>
      {modalType === "delete" ? (
        <div>Delete</div>
      ) : (
        <ProductForm formData={formData} setFormData={setFormData} />
      )}
      <DialogFooter className="flex flex-row items-center rounded-b-lg border border-t p-6">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            取消
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={onSubmit}>
            {modalType === "delete" ? "刪除" : "確認"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

ProductModal.propTypes = {
  title: PropTypes.string,
  modalType: PropTypes.string,
  setProducts: PropTypes.func,
};

export default ProductModal;
