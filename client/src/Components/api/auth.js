import jwtDecode from "jwt-decode";

const auth = {
  setToken: (token) => localStorage.setItem('token', token),
  deleteToken: () => localStorage.removeItem('token'),
  getToken: () => localStorage.getItem('token'),
  getUser: function () {
    const token = this.getToken();
    return token && jwtDecode(token);
  },
};

export const CheckLogin = () => {
  const checkToken = auth.getToken();
  return checkToken ? true : false;
};

export default auth;
