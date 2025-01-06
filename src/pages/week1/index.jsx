import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Week1() {
  // 設置主圖的狀態，用於顯示或更新主圖
  const [mainImage, setMainImage] = useState(null);
  const [tempProduct, setTempProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      category: "甜甜圈",
      content: "尺寸：14x14cm",
      description:
        "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
      id: "-L9tH8jxVb2Ka_DYPwng",
      is_enabled: 1,
      origin_price: 150,
      price: 99,
      title: "草莓莓果夾心圈",
      unit: "元",
      num: 10,
      imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8",
      imagesUrl: [
        "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a",
        "https://images.unsplash.com/photo-1559656914-a30970c1affd",
      ],
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description:
        "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
      id: "-McJ-VvcwfN1_Ye_NtVA",
      is_enabled: 1,
      origin_price: 1000,
      price: 900,
      title: "蜂蜜檸檬蛋糕",
      unit: "個",
      num: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
      imagesUrl: [
        "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
      ],
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
      id: "-McJ-VyqaFlLzUMmpPpm",
      is_enabled: 1,
      origin_price: 700,
      price: 600,
      title: "暗黑千層",
      unit: "個",
      num: 15,
      imageUrl:
        "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      ],
    },
  ]);

  // 查看細節按鈕的函數：將產品設置為臨時選中的產品，並更新主圖顯示
  const handleViewDetails = (item) => {
    setTempProduct(item); // 保存當前選中的產品數據
    setMainImage(item.imageUrl); // 更新主圖顯示為該產品的圖片
  };

  // 切換主圖的函數：用於點擊 "查看圖片" 時切換為主圖方便查看
  const handleChangeMainImage = (image) => {
    setMainImage(image); // 更新主圖顯示為該產品的圖片
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="mt-12 flex gap-6">
          <div className="mx-auto w-1/2">
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
                {products.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.origin_price}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.is_enabled ? "是" : "否"}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        onClick={() => handleViewDetails(item)}
                      >
                        查看細節
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mx-auto w-1/2">
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
                  <p className=" ">商品描述：{tempProduct.description}</p>

                  <p className="">商品內容：{tempProduct.content}</p>
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
                    {tempProduct.imagesUrl.map((image, index) => (
                      <div
                        key={index}
                        className="image-container"
                        onClick={() => handleChangeMainImage(image)}
                      >
                        <img
                          src={image}
                          alt={`圖片 ${index + 1}`}
                          className={`thumbnail-image ${mainImage === image ? "active" : ""}`}
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
    </>
  );
}

export default Week1;
