import { useState, useEffect, useRef } from "react";
import axios from "axios";
import validate from "validate.js";
import { useForm } from "react-hook-form";
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
  Label,
  Textarea,
} from "@/components/ui";

import { currency } from "../../utils/filter";
import CustomPagination from "@/components/CustomPagination";
import { Loader2 } from "lucide-react";
import { productAPI } from "@/services/client/product";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_BASE_PATH;

function Week5() {
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [pagination, setPagination] = useState({});
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const productModalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 取得全部產品
  const getProducts = async (page = 1) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/products?page=${page}`;
      const response = await axios.get(url);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getProduct = async (id) => {
    setLoadingProductId(id);
    try {
      const result = await productAPI.getProduct(id);
      setProduct(result.product);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  // 取得購物車列表
  const getCart = async () => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      setCart(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // 加入購物車
  const addCart = async (id, num) => {
    setLoadingCartId(id);
    const data = {
      product_id: id,
      qty: num,
    };
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart`;
      await axios.post(url, { data });
      getCart();
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoadingCartId(null);
      productModalRef.current.hide();
    }
  };

  // 清除單一筆購物車
  const deleteCart = async (id) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${id}`;
      await axios.delete(url);
      getCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // 清空購物車
  const deleteCartAll = async () => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/carts`;
      await axios.delete(url);
      getCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // 更新商品數量
  const updateCart = async (id, qty = 1) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${id}`;

      const data = {
        product_id: id,
        qty,
      };
      await axios.put(url, { data });
      getCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // 套用優惠碼
  const addCouponCode = async (code) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/coupon`;
      const data = {
        code,
      };
      await axios.post(url, { data });
      setCouponCode("");
      getCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const validateForm = (data) => {
    const validationErrors = validate(data);
    return validationErrors || {};
  };

  const onSubmit = async (data) => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const url = `${API_BASE}/api/${API_PATH}/order`;
        await axios.post(url, { data: { user: data, message: data.message } });
        reset();
        getCart();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openModal = async (id) => {
    productModalRef.current.show();
    getProduct(id);
  };

  const handleClick = (event, page) => {
    event.preventDefault();
    getProducts(page);
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  // useEffect(() => {
  //   productModalRef.current = new bootstrap.Modal("#productModal", {
  //     keyboard: false,
  //   });
  // }, []);

  return (
    <div className="container mx-auto w-5/6">
      {/* Product Modal */}
      {/* <div className="modal" id="productModal" ref={productModalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">產品名稱：{product.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img className="w-100" src={product.imageUrl} />
              <p className="mt-3">產品內容：{product.content}</p>
              <p>產品描述：{product.description}</p>
              <p>
                價錢：<del>原價 ${product.origin_price}</del>，特價：$
                {product.price}
              </p>
              <div className="d-flex align-items-center">
                <label style={{ width: "150px" }}>購買數量：</label>
                <button
                  className="btn btn-danger"
                  type="button"
                  id="button-addon1"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                  }
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <Input
                  className="form-control"
                  type="number"
                  value={cartQuantity}
                  min="1"
                  max="10"
                  onChange={(e) => setCartQuantity(Number(e.target.value))}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                  aria-label="Decrease quantity"
                  onClick={() => setCartQuantity((pre) => pre + 1)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addCart(product.id, cartQuantity)}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* 產品列表 */}
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
                <img className="h-24" src={product.imageUrl} alt="products" />
              </TableCell>
              <TableCell className="text-center">
                <del className="h6">
                  原價： {currency(product.origin_price)} 元
                </del>
                <div className="h5">特價： {currency(product.price)} 元</div>
              </TableCell>
              <TableCell className="text-center">{product.title}</TableCell>
              <TableCell>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    className="h-auto whitespace-normal"
                    onClick={() => openModal(product.id)}
                    disabled={loadingProductId === product.id}
                  >
                    {loadingProductId === product.id ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "查看更多"
                    )}
                  </Button>
                  <Button
                    className="h-auto whitespace-normal"
                    onClick={() => addCart(product.id, 1)}
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

      {/* 分頁 */}
      <CustomPagination pagination={pagination} />

      {/* 購物車列表 */}
      <div className="text-end">
        <Button
          className=""
          variant="destructive"
          onClick={() => deleteCartAll}
        >
          清空購物車
        </Button>
      </div>
      <Table className="mb-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">品名</TableHead>
            <TableHead className="text-center">數量/單位</TableHead>
            <TableHead className="text-center">單價</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.carts &&
            cart?.carts.map((item) => (
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
                      defaultValue={item.qty}
                      key={item.qty}
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
                    className="border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white"
                    variant="outline"
                    onClick={() => deleteCart(item.id)}
                  >
                    刪除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-right" colSpan={3}>
              總計
            </TableCell>
            <TableCell className="text-right">
              {currency(cart?.total)}
            </TableCell>
            {cart?.final_total !== cart?.total ? (
              <TableRow>
                <TableCell colSpan="3" className="text-success text-end">
                  折扣價
                </TableCell>
                <TableCell className="text-success text-end">
                  {currency(cart?.final_total)}
                </TableCell>
              </TableRow>
            ) : (
              ""
            )}
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mb-12 flex gap-4">
        <Input
          type="text"
          className="form-control"
          placeholder="請輸入優惠碼"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button type="button" onClick={() => addCouponCode(couponCode)}>
          套用優惠碼
        </Button>
      </div>

      {/* 表單資料 */}
      <div className="mx-auto w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              收件人姓名
            </label>
            <Input
              id="name"
              type="text"
              className="form-control"
              placeholder="請輸入姓名"
              {...register("name", { required: "請輸入收件人姓名。" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Input
              id="email"
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              {...register("email", {
                required: "請輸入 Email。",
                pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確。" },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              收件人電話
            </label>
            <Input
              id="tel"
              type="tel"
              className="form-control"
              placeholder="請輸入電話"
              {...register("tel", {
                required: "請輸入收件人電話。",
                minLength: {
                  value: 8,
                  message: "電話號碼至少需要 8 碼。",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "電話號碼格式不正確，僅限數字。",
                },
              })}
            />
            {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              收件人地址
            </label>
            <Input
              id="address"
              type="text"
              className="form-control"
              placeholder="請輸入地址"
              {...register("address", { required: "請輸入收件人地址。" })}
            />
            {errors.address && (
              <p className="text-danger">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-3">
            <Label htmlFor="message" className="form-label">
              留言
            </Label>
            <Textarea
              id="message"
              className="form-control"
              placeholder="留言"
              rows="3"
              {...register("message")}
            />
          </div>

          <div className="text-end">
            <Button type="submit" className="btn btn-danger">
              送出訂單
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Week5;
