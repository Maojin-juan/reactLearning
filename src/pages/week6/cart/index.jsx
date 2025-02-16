import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, resetCartStatus } from "@/store/slices/cartSlice";
import Cart from "@/components/client/Cart";

function CartPage() {
  const dispatch = useDispatch();
  const { items: cart, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(resetCartStatus()); // 重置狀態
    dispatch(fetchCart()); // 獲取資料
  }, [dispatch]);

  if (status === "loading") {
    return <div>載入中...</div>;
  }

  if (status === "failed") {
    return <div>錯誤: {error}</div>;
  }

  return <Cart cart={cart} getCart={() => dispatch(fetchCart())} />;
}

export default CartPage;
