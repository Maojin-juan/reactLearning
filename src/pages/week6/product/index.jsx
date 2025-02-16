import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/store/slices/cartSlice";
import { clientProductAPI } from "@/services/client/product";
import ProductList from "@/components/client/ProductList";
import ProductModal from "@/components/client/ProductModal";
import { useModal } from "@/hooks/useModal";

function ProductListPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();

  const getProducts = async (page = 1) => {
    try {
      const result = await clientProductAPI.getProducts(page);
      setProducts(result.products);
      setPagination(result.pagination);
    } catch (error) {
      console.error("取得產品列表失敗:", error);
    }
  };

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
  }, []);

  return (
    <div className="container mx-auto w-5/6">
      <ProductList
        products={products}
        pagination={pagination}
        onOpenModal={handleOpenModal}
        getProducts={getProducts}
        getCart={() => dispatch(fetchCart())}
      />
      <ProductModal
        product={selectedProduct}
        open={isOpen}
        onOpenChange={closeModal}
        getCart={() => dispatch(fetchCart())}
      />
    </div>
  );
}

export default ProductListPage;
