import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, Button } from "@/components/ui";

import { useAuth } from "@/hooks/useAuth";

import Login from "@/components/Login";
import ProductHandle from "@/components/ProductHandle";
import ProductModal from "@/components/ProductModal";
import { productAPI } from "@/services/product";

function Week3() {
  const [isAuth, setIsAuth] = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (isAuth) {
        const updatedProducts = await productAPI.getProducts();
        setProducts(updatedProducts.products);
      }
    };
    fetchProducts();
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
        <div className="container mx-auto mt-12 gap-6">
          <Dialog>
            <div className="flex justify-end">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-2"
                  size="lg"
                >
                  建立新的產品
                </Button>
              </DialogTrigger>
            </div>
            <ProductHandle products={products} />
            <ProductModal
              title="建立新的產品"
              modalType="add"
              setProducts={setProducts}
            />
          </Dialog>
        </div>
      ) : (
        <Login setIsAuth={setIsAuth} setProducts={setProducts} />
      )}
    </>
  );
}

export default Week3;
