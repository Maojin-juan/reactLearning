import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  Button,
  Input,
} from "@/components/ui";
import { Loader2 } from "lucide-react";
import { currency } from "@/utils/format";
import { clientProductAPI } from "@/services/client/product";

function Cart({ cart, getCart }) {
  const [couponCode, setCouponCode] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  // 更新購物車商品數量
  const updateCart = async (id, qty) => {
    setLoadingId(id);
    try {
      await clientProductAPI.updateCart(id, qty);
      getCart();
    } catch (error) {
      console.error("更新購物車失敗:", error);
    } finally {
      setLoadingId(null);
    }
  };

  // 刪除購物車商品
  const deleteCart = async (id) => {
    setLoadingId(id);
    try {
      await clientProductAPI.deleteCart(id);
      getCart();
    } catch (error) {
      console.error("刪除購物車商品失敗:", error);
    } finally {
      setLoadingId(null);
    }
  };

  // 清空購物車
  const deleteCartAll = async () => {
    try {
      await clientProductAPI.deleteCartAll();
      getCart();
    } catch (error) {
      console.error("清空購物車失敗:", error);
    }
  };

  // 套用優惠碼
  const addCouponCode = async () => {
    try {
      await clientProductAPI.addCoupon(couponCode);
      setCouponCode("");
      getCart();
    } catch (error) {
      console.error("套用優惠碼失敗:", error);
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-4 text-end">
        <Button variant="destructive" onClick={deleteCartAll}>
          清空購物車
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">品名</TableHead>
            <TableHead className="text-center">數量/單位</TableHead>
            <TableHead className="text-center">單價</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.carts?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">
                {item.product.title}
                {item.coupon && (
                  <div className="text-success">已套用優惠券</div>
                )}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-4">
                  <Input
                    type="number"
                    className="w-32"
                    min="1"
                    value={item.qty}
                    disabled={loadingId === item.id}
                    onChange={(e) =>
                      updateCart(item.id, Number(e.target.value))
                    }
                  />
                  <p>{item.product.unit}</p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {item.final_total !== item.total && (
                  <small className="text-success">折扣價：</small>
                )}
                {currency(item.final_total)}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="outline"
                  className="border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => deleteCart(item.id)}
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "刪除"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right">
              總計
            </TableCell>
            <TableCell className="text-right">
              {currency(cart?.total)}
            </TableCell>
          </TableRow>
          {cart?.final_total !== cart?.total && (
            <TableRow>
              <TableCell colSpan={3} className="text-success text-end">
                折扣價
              </TableCell>
              <TableCell className="text-success text-end">
                {currency(cart?.final_total)}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>

      <div className="mt-4 flex gap-4">
        <Input
          type="text"
          placeholder="請輸入優惠碼"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button onClick={addCouponCode}>套用優惠碼</Button>
      </div>
    </div>
  );
}

export default Cart;
