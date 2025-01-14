import { useState } from "react";

import Login from "@/components/Login";
import CreateProduct from "@/components/CreateProduct";

function Week3() {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  return (
    <>
      {isAuth ? (
        <div className="container mx-auto">
          <div className="mx-auto mt-12 flex gap-6">
            <CreateProduct
              products={products}
              setTempProduct={setTempProduct}
            />
          </div>
        </div>
      ) : (
        <Login setIsAuth={setIsAuth} setProducts={setProducts} />
      )}
    </>
  );
}

export default Week3;
