import Cookies from "js-cookie";
import axiosClient from "./axios";

class AdminApi {
  login(params) {
    const url = "auth/admin/login/";
    const res = axiosClient.post(url, params);
    return res;
  }
  logout() {
    const url = "auth/admin/logout";
    const res = axiosClient.post(url);
    return res;
  }
  save_token(data) {
    Cookies.set("access_token", data.data.access_token);
    Cookies.set("refresh_token", data.data.refresh_token);
  }
  remove_token(response) {
    Cookies.remove("access_token");
    Cookies.remove("access_token");
  }

  get_token() {
    return {
      access: Cookies.get("access_token"),
      refresh: Cookies.get("access_token"),
    };
  }
}

export { AdminApi };
