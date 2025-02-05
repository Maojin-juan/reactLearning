import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@/components/ui";
import { Loader2 } from "lucide-react";
import { clientProductAPI } from "@/services/client/product";
import CustomPagination from "@/components/CustomPagination";
import { currency } from "@/utils/format";

function ProductList({ products, pagination, getCart, onOpenModal }) {
  const [loadingCartId, setLoadingCartId] = useState(null);

  const addToCart = async (productId) => {
    setLoadingCartId(productId);
    try {
      await clientProductAPI.addToCart(productId, 1);
      getCart();
    } catch (error) {
      console.error("加入購物車失敗:", error);
    } finally {
      setLoadingCartId(null);
    }
  };

  return (
    <>
      <Table className="mb-12 w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">圖片</TableHead>
            <TableHead className="text-center">產品名稱</TableHead>
            <TableHead className="text-center">價錢</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  className="h-24"
                  src={product.imageUrl}
                  alt={product.title}
                />
              </TableCell>
              <TableCell className="text-center">{product.title}</TableCell>
              <TableCell className="text-center">
                <del className="h6">
                  原價：{currency(product.origin_price)} 元
                </del>
                <div className="h5">特價：{currency(product.price)} 元</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    className="h-auto whitespace-normal"
                    onClick={() => onOpenModal(product.id)}
                  >
                    查看更多
                  </Button>
                  <Button
                    className="h-auto whitespace-normal"
                    onClick={() => addToCart(product.id)}
                    disabled={loadingCartId === product.id}
                  >
                    {loadingCartId === product.id ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "加入購物車"
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination pagination={pagination} />
    </>
  );
}

export default ProductList;
