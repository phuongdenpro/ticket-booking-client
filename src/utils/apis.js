import Cookies from "js-cookie";
import axiosApi from "./axios";

class AdminApi {
  login(params) {
    const url = "auth/admin/login/";
    return axiosApi.post(url, params);
  }
  logout() {
    const url = "auth/admin/logout";
    return axiosApi.post(url);
  }
  save_token(data) {
    Cookies.set("access_token", data.data.access_token);
    Cookies.set("refresh_token", data.data.refresh_token);
  }
}

export { AdminApi };
