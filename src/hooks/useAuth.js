import { useState, useEffect } from "react";
import { signInAPI } from "@/services/signIn";
import axios from "axios";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common.Authorization = token;

    const verifyAdmin = async () => {
      try {
        await signInAPI.checkAuth();
        setIsAuth(true);
      } catch (err) {
        console.log(err.response?.data?.message || "驗證失敗");
      }
    };

    verifyAdmin();
  }, []);

  return isAuth;
};
