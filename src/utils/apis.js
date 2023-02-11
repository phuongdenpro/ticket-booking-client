import Cookies from "js-cookie";
import axiosClient from "./axios";

class AdminApi {
  login(params) {
    const url = "auth/admin/login/";
    const res =  axiosClient.post(url, params);
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
}

class StationApi {
  getAllStations(params) {
    const url = "station";
    const res = axiosClient.get(url,{
      params: {
        ...params,
      },
    });
    return res;
  }
  deleteStation(params) {
    const url = "station/id";
    const res = axiosClient.get(url,{
      params: {
        ...params,
      },
    });
    return res;
  }


}

export { AdminApi };
export { StationApi };
