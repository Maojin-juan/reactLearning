import PropTypes from "prop-types";
import {
  Dialog,
  DialogTrigger,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
} from "@/components/ui";
import ProductModal from "@/components/ProductModal";
function ProductHandle({
  products,
  setProducts,
  formData,
  setFormData,
  setLoading,
}) {
  const openModal = (product) => {
    setFormData({
      id: product.id || "",
      imageUrl: product.imageUrl || "",
      title: product.title || "",
      category: product.category || "",
      unit: product.unit || "",
      origin_price: product.origin_price || "",
      price: product.price || "",
      description: product.description || "",
      content: product.content || "",
      is_enabled: product.is_enabled || false,
      imagesUrl: product.imagesUrl || [],
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">分類</TableHead>
          <TableHead className="text-center">產品名稱</TableHead>
          <TableHead className="text-center">原價</TableHead>
          <TableHead className="text-center">售價</TableHead>
          <TableHead className="text-center">是否啟用</TableHead>
          <TableHead className="text-center">編輯</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products && products.length > 0 ? (
          products.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">{item.title}</TableCell>
              <TableCell className="text-center">{item.origin_price}</TableCell>
              <TableCell className="text-center">{item.price}</TableCell>
              <TableCell className="text-center">
                {item.is_enabled ? (
                  <span className="text-green-600">啟用</span>
                ) : (
                  <span>未啟用</span>
                )}
              </TableCell>
              <TableCell className="flex justify-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => openModal(item)}>
                      編輯
                    </Button>
                  </DialogTrigger>
                  <ProductModal
                    title="編輯"
                    modalType="edit"
                    setProducts={setProducts}
                    formData={formData}
                    setFormData={setFormData}
                    setLoading={setLoading}
                  />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-red-600"
                      onClick={() => openModal(item)}
                    >
                      刪除
                    </Button>
                  </DialogTrigger>
                  <ProductModal
                    title="刪除"
                    modalType="delete"
                    products={item}
                    setProducts={setProducts}
                    formData={formData}
                    setFormData={setFormData}
                    setLoading={setLoading}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>尚無產品資料</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

ProductHandle.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default ProductHandle;
