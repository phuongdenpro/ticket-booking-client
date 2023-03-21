import Cookies from "js-cookie";
import axiosClient from "./axios";

class CustomerApi {
  getAll(params) {
    const url = "customer";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }
  

  create(params){
    const url = `customer`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }

  getById(id, params) {
    const url = `customer/${id}`;
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  deleteById(id, params) {
    const url = `customer/${id}`;
    const res = axiosClient.delete(url, params);
    return res;
  }
}
export { CustomerApi };
