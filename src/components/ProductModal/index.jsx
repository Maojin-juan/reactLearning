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

function ProductModal({
  title,
  modalType,
  setProducts,
  formData,
  setFormData,
}) {
  const onSubmit = async () => {
    if (modalType === "delete") {
      await productAPI.delProductData(formData.id);
    } else {
      await productAPI.updateProductData(formData.id, formData, modalType);
    }

    const updatedProducts = await productAPI.getProducts();
    setProducts(updatedProducts.products);
  };

  return (
    <DialogContent
      className={`gap-0 rounded-lg p-0 ${modalType === "delete" ? "h-auto" : "h-5/6"}`}
    >
      <DialogHeader
        className={`mb-auto h-20 justify-center rounded-t-lg border border-b p-6 ${modalType === "delete" ? "bg-red-600 text-white" : "bg-slate-800 text-white"}`}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="hidden">
          This is a hidden description to avoid warnings.
        </DialogDescription>
      </DialogHeader>
      {modalType === "delete" ? (
        <div className="p-10">
          <p className="text-xl">確定要刪除嗎？</p>
        </div>
      ) : (
        <ProductForm formData={formData} setFormData={setFormData} />
      )}
      <DialogFooter className="mt-auto flex h-20 flex-row items-center rounded-b-lg border border-t p-6">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            取消
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            className={modalType === "delete" ? "bg-red-600" : "bg-primary"}
            type="button"
            onClick={onSubmit}
          >
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
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ProductModal;
