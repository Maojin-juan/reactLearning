import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui";

function ProductDetail({ tempProduct }) {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (tempProduct) {
      setMainImage(tempProduct.imageUrl);
    }
  }, [tempProduct]);

  // 切換主圖的函數：用於點擊 "查看圖片" 時切換為主圖方便查看
  const handleChangeMainImage = (image) => {
    setMainImage(image); // 更新主圖顯示為該產品的圖片
  };

  return (
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
                onClick={() => handleChangeMainImage(tempProduct.imageUrl)}
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
  );
}

ProductDetail.propTypes = {
  tempProduct: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    content: PropTypes.string,
    origin_price: PropTypes.number,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    imagesUrl: PropTypes.array,
  }),
};

export default ProductDetail;
