import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

function CreateProduct({ products, setTempProduct }) {
  return (
    <div className="container">
      <div className="text-end">
        <Button type="button">建立新的產品</Button>
      </div>
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
                <TableCell className="text-center">
                  {item.origin_price}
                </TableCell>
                <TableCell className="text-center">{item.price}</TableCell>
                <TableCell className="text-center">
                  {item.is_enabled ? (
                    <span className="text-green-600">啟用</span>
                  ) : (
                    <span>未啟用</span>
                  )}
                </TableCell>
                <TableCell className="flex justify-center gap-3">
                  <Button
                    onClick={() => {
                      setTempProduct(item);
                    }}
                  >
                    查看細節
                  </Button>
                  <Button
                    onClick={() => {
                      setTempProduct(item);
                    }}
                  >
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
      <table className="mt-4 table">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td className="text-end">{product.origin_price}</td>
              <td className="text-end">{product.price}</td>
              <td>
                {product.is_enabled ? (
                  <span className="text-success">啟用</span>
                ) : (
                  <span>未啟用</span>
                )}
              </td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CreateProduct.propTypes = {
  products: PropTypes.array.isRequired,
  setTempProduct: PropTypes.func.isRequired,
};

export default CreateProduct;
