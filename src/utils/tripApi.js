import Cookies from "js-cookie";
import axiosClient from "./axios";

class TripApi {
  getAll(params) {
    const url = "trip";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }
}
export { TripApi };
