import { useState } from "react";

import ProductDetail from "@/components/admin/ProductDetail";
import ProductList from "@/components/admin/ProductList";
import Login from "@/components/admin/Login";

function Week2() {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  return (
    <>
      {isAuth ? (
        <div className="container mx-auto">
          <div className="mx-auto mt-12 flex gap-6">
            <ProductList products={products} setTempProduct={setTempProduct} />
            <ProductDetail tempProduct={tempProduct} />
          </div>
        </div>
      ) : (
        <Login setIsAuth={setIsAuth} setProducts={setProducts} />
      )}
    </>
  );
}

export default Week2;
