import Cookies from "js-cookie";
import axiosClient from "./axios";

class AdminApi {
  login(params) {
    const url = "auth/admin/login/";
    return axiosClient.post(url, params);
  }
  logout() {
    const url = "auth/admin/logout";
    return axiosClient.post(url);
  }
  save_token(data) {
    Cookies.set("access_token", data.data.access_token);
    Cookies.set("refresh_token", data.data.refresh_token);
  }
}

export { AdminApi };
