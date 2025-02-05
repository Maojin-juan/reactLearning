import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Button,
  DialogClose,
  DialogDescription,
} from "@/components/ui";
import { Loader2, X, Plus, Minus } from "lucide-react";
import { currency } from "@/utils/format";
import { clientProductAPI } from "@/services/client/product";

function ProductModal({ product, open, onOpenChange, getCart }) {
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCart = async () => {
    setIsLoading(true);
    try {
      await clientProductAPI.addToCart(product.id, cartQuantity);
      getCart();
      onOpenChange(false);
    } catch (error) {
      console.error("加入購物車失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-5/6 max-w-2xl p-0">
        <DialogHeader className="mb-auto h-20 justify-center rounded-t-lg border border-b bg-slate-800 p-6 text-white">
          <DialogTitle className="text-xl font-medium">
            產品名稱：{product.title}
          </DialogTitle>
          <DialogDescription className="hidden">
            This is a hidden description to avoid warnings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-auto p-6">
          <img
            className="w-full rounded-lg"
            src={product.imageUrl}
            alt={product.title}
          />

          <div className="space-y-2">
            <p>產品內容：{product.content}</p>
            <p>產品描述：{product.description}</p>
            <p>
              價錢：<del>原價 {currency(product.origin_price)}</del>， 特價：
              {currency(product.price)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32">購買數量：</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCartQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                className="mx-2 w-20 text-center"
                value={cartQuantity}
                min="1"
                onChange={(e) => setCartQuantity(Number(e.target.value))}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCartQuantity((prev) => prev + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleAddCart} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "加入購物車"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ProductModal.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
};

export default ProductModal;
