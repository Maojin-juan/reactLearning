import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_BASE_PATH;

function Week2() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [isAuth, setisAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  async function checkLogin() {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];
      console.log(token);
      axios.defaults.headers.common.Authorization = token;

      const res = await axios.post(`${API_BASE}/api/user/check`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products`,
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // 查看細節按鈕的函數：將產品設置為臨時選中的產品，並更新主圖顯示
  const handleViewDetails = (item) => {
    setTempProduct(item); // 保存當前選中的產品數據
    setMainImage(item.imageUrl); // 更新主圖顯示為該產品的圖片
  };

  // 切換主圖的函數：用於點擊 "查看圖片" 時切換為主圖方便查看
  const handleChangeMainImage = (image) => {
    setMainImage(image); // 更新主圖顯示為該產品的圖片
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      axios.defaults.headers.common.Authorization = `${token}`;

      getData();

      setisAuth(true);
    } catch (error) {
      alert("登入失敗: " + error.response.data.message);
    }
  };

  return (
    <>
      {isAuth ? (
        <div className="container mx-auto">
          <div className="mx-auto mt-12 flex gap-6">
            <div className="w-1/2">
              <Button
                className="mb-5 bg-red-600"
                type="button"
                id="check"
                onClick={checkLogin}
              >
                確認是否登入
              </Button>
              <h2 className="mb-2 text-3xl">產品列表</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>產品名稱</TableHead>
                    <TableHead>原價</TableHead>
                    <TableHead>售價</TableHead>
                    <TableHead>是否啟用</TableHead>
                    <TableHead>查看細節</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.origin_price}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {item.is_enabled ? "啟用" : "未啟用"}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => setTempProduct(item)}>
                            查看細節
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="5">尚無產品資料</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="w-1/2">
              <h2 className="mb-2 text-3xl">單一產品細節</h2>
              {tempProduct ? (
                <div className="rounded-lg border border-gray-200 bg-white shadow">
                  <div className="relative h-80 w-full">
                    <img
                      src={mainImage || tempProduct.imageUrl}
                      className="h-full w-full rounded-t-lg object-cover"
                      alt="主圖"
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="flex items-center text-xl font-bold">
                      {tempProduct.title}
                      <Button
                        type="button"
                        className="ms-2 h-6 rounded-full px-2.5 text-xs font-medium"
                      >{`# ${tempProduct.category}`}</Button>
                    </h5>
                    <p>商品描述：{tempProduct.category}</p>
                    <p>商品內容：{tempProduct.content}</p>
                    <div className="flex">
                      <p className="text-slate-400">
                        <del>{tempProduct.origin_price}</del>
                      </p>
                      元 / {tempProduct.price} 元
                    </div>
                    <h5 className="mt-12">更多圖片：</h5>
                    <div className="flex flex-wrap gap-2">
                      <div
                        className="image-container"
                        onClick={() =>
                          handleChangeMainImage(tempProduct.imageUrl)
                        }
                      >
                        <img
                          src={tempProduct.imageUrl}
                          alt="主圖"
                          className={`thumbnail-image ${mainImage === tempProduct.imageUrl ? "active" : ""}`}
                        />
                        <div className="image-overlay">查看圖片</div>
                      </div>
                      {tempProduct.imagesUrl?.map((url, index) => (
                        <div
                          key={index}
                          className="image-container"
                          onClick={() => handleChangeMainImage(url)}
                        >
                          <img
                            key={index}
                            src={url}
                            alt={`圖片 ${index + 1}`}
                            className={`thumbnail-image ${mainImage === url ? "active" : ""}`}
                          />
                          <div className="image-overlay">查看圖片</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600">請選擇一個商品查看</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex h-screen flex-col items-center justify-center">
          <div className="flex flex-col justify-center rounded-lg border p-10">
            <h1 className="mb-3 text-3xl font-normal">請先登入</h1>
            <div>
              <form
                id="form"
                className="flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col items-center gap-3">
                  <Label htmlFor="username">Email address</Label>
                  <Input
                    type="email"
                    id="username"
                    placeholder="name@example.com"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button className="w-full" type="submit">
                  登入
                </Button>
              </form>
            </div>
          </div>
          <p className="mb-3 mt-5 text-slate-400">&copy; 2024~∞ - 六角學院</p>
        </div>
      )}
    </>
  );
}

export default Week2;
