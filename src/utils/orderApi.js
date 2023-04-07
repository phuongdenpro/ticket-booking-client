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

  getListOrder(params){
    const url = "order";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  getOrderById(id,params){
    const url = `order/id/${id}`;
    const res = axiosClient.get(url, {
      ...params,
    });
    return res;
  }
  

  getOrderStatus() {
    const url = "order/status";
    const res = axiosClient.get(url);
    return res;
  }

}
export { OrderApi };
