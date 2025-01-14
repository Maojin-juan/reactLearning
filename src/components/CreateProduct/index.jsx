import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import Modal from "@/components/Modal";
import { useState } from "react";

const initialFormData = {
  id: "",
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  originPrice: "",
  price: "",
  description: "",
  content: "",
  isEnabled: false,
  imagesUrl: [],
};

function CreateProduct({ products }) {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="container">
      <div className="text-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full px-8 py-2"
              size="lg"
              onClick={() =>
                setFormData({
                  id: formData.id || "",
                  imageUrl: formData.imageUrl || "",
                  title: formData.title || "",
                  category: formData.category || "",
                  unit: formData.unit || "",
                  originPrice: formData.originPrice || "",
                  price: formData.price || "",
                  description: formData.description || "",
                  content: formData.content || "",
                  isEnabled: formData.isEnabled || false,
                  imagesUrl: formData.imagesUrl || [],
                })
              }
            >
              建立新的產品
            </Button>
          </DialogTrigger>
          <Modal formData={formData} title="Are you absolutely sure?" />
        </Dialog>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>查看細節</Button>
                    </DialogTrigger>
                    <Modal />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>查看細節</Button>
                    </DialogTrigger>
                    <Modal />
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
    </div>
  );
}

CreateProduct.propTypes = {
  products: PropTypes.array.isRequired,
  setTempProduct: PropTypes.func.isRequired,
};

export default CreateProduct;
