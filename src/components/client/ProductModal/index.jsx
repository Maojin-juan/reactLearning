import { useState } from "react";
import { Input, Button } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { currency } from "@/utils/format";

function ProductModal({ product, isOpen, onClose, getCart }) {
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCart = async () => {
    setIsLoading(true);
    try {
      await clientProductAPI.addToCart(product.id, cartQuantity);
      getCart();
      onClose();
    } catch (error) {
      console.error("加入購物車失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-medium">產品名稱：{product.title}</h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <span className="sr-only">關閉</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <img className="w-full" src={product.imageUrl} alt={product.title} />
          <p className="mt-3">產品內容：{product.content}</p>
          <p>產品描述：{product.description}</p>
          <p>
            價錢：<del>原價 {currency(product.origin_price)}</del>， 特價：
            {currency(product.price)}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <label className="w-32">購買數量：</label>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCartQuantity((prev) => (prev > 1 ? prev - 1 : 1))
              }
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
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
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleAddCart} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "加入購物車"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
