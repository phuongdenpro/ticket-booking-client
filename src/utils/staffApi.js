import Cookies from "js-cookie";
import axiosClient from "./axios";

class StaffApi {
  getAll(params) {
    const url = "staff";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  
}
export { StaffApi };
