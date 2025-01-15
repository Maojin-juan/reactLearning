import { useState } from "react";

import { Dialog, DialogTrigger, Button } from "@/components/ui";

import Login from "@/components/Login";
import ProductHandle from "@/components/ProductHandle";

import ProductModal from "@/components/ProductModal";

function Week3() {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);

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
            <ProductModal title="建立新的產品" />
          </Dialog>
        </div>
      ) : (
        <Login setIsAuth={setIsAuth} setProducts={setProducts} />
      )}
    </>
  );
}

export default Week3;
