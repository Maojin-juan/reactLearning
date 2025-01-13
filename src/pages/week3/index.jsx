import { useState } from "react";

import Login from "@/components/Login";
import CreateProduct from "@/components/CreateProduct";

const initialFormData = {
  id: "",
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  originPrice: "",
  price: "",
  description: "",
  content: "",
  isEnabled: false,
  imagesUrl: [],
};

function Week3() {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

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
