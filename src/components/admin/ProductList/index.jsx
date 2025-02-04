import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@/components/ui";

import { signInAPI } from "@/services/admin/signIn";

function ProductList({ products, setTempProduct }) {
  return (
    <div className="w-1/2">
      <Button
        className="mb-5 bg-red-600"
        type="button"
        id="check"
        onClick={signInAPI.checkAuth}
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
                <TableCell>{item.is_enabled ? "啟用" : "未啟用"}</TableCell>
                <TableCell>
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
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setTempProduct: PropTypes.func.isRequired,
};

export default ProductList;
