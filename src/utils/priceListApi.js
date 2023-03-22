import Cookies from "js-cookie";
import axiosClient from "./axios";

class PriceListApi {
  getAll(params) {
    const url = "price-list";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  create(params) {
    const url = `price-list`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }

  getPriceListById(id, params) {
    const url = `price-list/id/${id}`;
    const res = axiosClient.get(url, {
      ...params,
    });
    return res;
  }


  deleteById(id, params) {
    const url = `price-list/id/${id}`;
    const res = axiosClient.delete(url, params);
    return res;
  }
}
export { PriceListApi };
