import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, Button } from "@/components/ui";

import "@/assets/style/loading.css";

import { useAuth } from "@/hooks/useAuth";

import Login from "@/components/backend/Login";
import ProductHandle from "@/components/backend/ProductHandle";
import ProductModal from "@/components/backend/ProductModal";
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
  rating: "",
};

function Week3() {
  const [isAuth, setIsAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        try {
          const updatedProducts = await productAPI.getProducts();
          setProducts(updatedProducts.products);
        } catch (error) {
          console.error("獲取產品失敗:", error);
        }
      }
    })();
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
        <div className="container mx-auto gap-6">
          <Dialog>
            <div className="flex justify-end">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-2"
                  size="lg"
                  onClick={() => setFormData(initialFormData)}
                >
                  建立新的產品
                </Button>
              </DialogTrigger>
            </div>
            <ProductModal
              title="建立新的產品"
              modalType="add"
              setProducts={setProducts}
              formData={formData}
              setFormData={setFormData}
              setLoading={setLoading}
            />
          </Dialog>
          <ProductHandle
            products={products}
            setProducts={setProducts}
            formData={formData}
            setFormData={setFormData}
            setLoading={setLoading}
          />
          {loading && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-25 backdrop-blur-sm">
              <div className="pong-loader"></div>
            </div>
          )}
        </div>
      ) : (
        <Login setIsAuth={setIsAuth} />
      )}
    </>
  );
}

export default Week3;
