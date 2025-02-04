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
  setLoading,
}) {
  const onSubmit = async () => {
    setLoading(true);

    try {
      if (modalType === "delete") {
        await productAPI.delProductData(formData.id);
      } else {
        await productAPI.updateProductData(formData.id, formData, modalType);
      }

      const updatedProducts = await productAPI.getProducts();
      setProducts(updatedProducts.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent
      className={`w-full max-w-5xl gap-0 rounded-lg p-0 ${modalType === "delete" ? "h-auto" : "h-5/6"}`}
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
      <DialogFooter className="mt-auto flex h-20 flex-row items-center gap-3 rounded-b-lg border border-t p-6">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            取消
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            className={`!ml-0 ${modalType === "delete" ? "bg-red-600" : "bg-primary"}`}
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
  title: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  setProducts: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default ProductModal;
