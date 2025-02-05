import { useState, useEffect } from "react";
import { clientProductAPI } from "@/services/client/product";
import ProductList from "@/components/client/ProductList";
import Cart from "@/components/client/Cart";
import CheckoutForm from "@/components/client/CheckoutForm";
import ProductModal from "@/components/client/ProductModal";
import { useModal } from "@/hooks/useModal";

function Week5() {
  // 狀態管理
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();

  // 取得產品列表
  const getProducts = async (page = 1) => {
    try {
      const result = await clientProductAPI.getProducts(page);
      setProducts(result.products);
      setPagination(result.pagination);
    } catch (error) {
      console.error("取得產品列表失敗:", error);
    }
  };

  // 取得購物車
  const getCart = async () => {
    try {
      const result = await clientProductAPI.getCart();
      setCart(result.data);
    } catch (error) {
      console.error("取得購物車失敗:", error);
    }
  };

  // 開啟產品 Modal
  const handleOpenModal = async (id) => {
    try {
      const result = await clientProductAPI.getProduct(id);
      setSelectedProduct(result.product);
      openModal();
    } catch (error) {
      console.error("取得產品詳情失敗:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  return (
    <div className="container mx-auto w-5/6">
      <ProductList
        products={products}
        pagination={pagination}
        getCart={getCart}
        onOpenModal={handleOpenModal}
        getProducts={getProducts}
      />

      <Cart cart={cart} getCart={getCart} />

      <CheckoutForm getCart={getCart} />

      <ProductModal
        product={selectedProduct}
        open={isOpen}
        onOpenChange={closeModal} // 改用 closeModal
        getCart={getCart}
      />
    </div>
  );
}

export default Week5;
