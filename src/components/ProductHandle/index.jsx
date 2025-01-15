import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Dialog,
  DialogTrigger,
} from "@/components/ui";

import ProductModal from "@/components/ProductModal";

function ProductHandle({ products }) {
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
                    <Button>編輯</Button>
                  </DialogTrigger>
                  <ProductModal />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>刪除</Button>
                  </DialogTrigger>
                  <ProductModal />
                </Dialog>
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
  );
}

ProductHandle.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductHandle;
