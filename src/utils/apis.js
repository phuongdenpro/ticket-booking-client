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
}

export { AdminApi };
