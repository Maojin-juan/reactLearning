import { useState, useEffect } from "react";
import { signInAPI } from "@/services/admin/signIn";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    if (token) {
      const verifyAdmin = async () => {
        try {
          await signInAPI.checkAuth();
          setIsAuth(true);
        } catch (err) {
          console.error("認證失敗:", err);
        }
      };

      verifyAdmin();
    }
  }, []);

  return { isAuth, setIsAuth };
};
