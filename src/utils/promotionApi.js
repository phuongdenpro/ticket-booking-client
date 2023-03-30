import Cookies from "js-cookie";
import axiosClient from "./axios";

class PromotionApi {
  getStatus(params) {
    const url = "promotion/status";
    const res = axiosClient.get(url);
    return res;
  }
  getAll(params) {
    const url = "promotion";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  create(params) {
    const url = `promotion`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }
  getById(id, params) {
    const url = `promotion/id/${id}`;
    const res = axiosClient.get(url, {
      ...params,
    });
    return res;
  }
  updateById(code, params) {
    const url = `promotion/id/${code}`;
    const res = axiosClient.patch(url, {
      ...params,
    });
    return res;
  }

  

  deleteById(id, params) {
    const url = `promotion/${id}`;
    const res = axiosClient.delete(url, params);
    return res;
  }

  getPromotionLine(params) {
    const url = `promotion-line`;
    const res = axiosClient.get(url, {
      params: {
        sort: "ASC",
        ...params,
      },
    });
    return res;
  }


 
}
export { PromotionApi };
