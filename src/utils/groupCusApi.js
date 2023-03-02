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

  deleteById(id, params) {
    const url = `customer-group/id/${id}`;
    const res = axiosClient.delete(url, params);
    return res;
  }
}
export { GroupCusApi };
