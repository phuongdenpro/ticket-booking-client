import Cookies from "js-cookie";
import axiosClient from "./axios";

class OrderApi {
  searchCustomer(params) {
    const url = "customer/order/search";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  createOrder(params){
    const url = `order`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }

}
export { OrderApi };
