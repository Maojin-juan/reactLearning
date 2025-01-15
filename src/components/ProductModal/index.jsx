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

function ProductModal({ title, modalType }) {
  return (
    <DialogContent className="h-5/6 gap-0 rounded-lg p-0">
      <DialogHeader className="justify-center rounded-t-lg border border-b p-6">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="hidden">
          This is a hidden description to avoid warnings.
        </DialogDescription>
      </DialogHeader>
      <ProductForm />
      <DialogFooter className="flex flex-row items-center rounded-b-lg border border-t p-6">
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
  modalType: PropTypes.string,
};

export default ProductModal;
