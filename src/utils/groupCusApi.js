import Cookies from "js-cookie";
import axiosClient from "./axios";

class GroupCusApi {
  getAll(params) {
    const url = "customer-group";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

 

}
export { GroupCusApi };
