import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { signInAPI } from "@/services/signIn";
import { productAPI } from "@/services/product";

const initialFormData = {
  username: "",
  password: "",
};

export function Login({ setIsAuth, setProducts }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const getProduct = async () => {
    const result = await productAPI.getProducts();
    setProducts(result.products);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await signInAPI.signIn(formData);
      const { token, expired } = result;

      document.cookie = `hexToken=${token};expires=${new Date(expired).toUTCString()};path=/;`;
      axios.defaults.headers.common.Authorization = token;

      getProduct();

      setIsAuth(true);
    } catch (error) {
      console.error(error);
      alert(`登入失敗: ${error.response?.data?.message}`);
    }
  };

  return (
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
  );
}

Login.propTypes = {
  setIsAuth: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default Login;
