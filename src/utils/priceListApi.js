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
}
export { PriceListApi };
