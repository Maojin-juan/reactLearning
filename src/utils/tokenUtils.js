export const tokenUtils = {
  getToken: () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
  },

  setToken: (token) => {
    document.cookie = `hexToken=${token}; path=/`;
  },

  removeToken: () => {
    document.cookie =
      "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};
