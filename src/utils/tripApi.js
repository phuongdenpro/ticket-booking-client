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

  createTrip(params) {
    const url = `trip`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }

  deleteTrip(id, params) {
    const url = `trip/id/${id}`;
    const res = axiosClient.delete(url, {
      params: {
        ...params,
      },
    });
    return res;
  }
}
export { TripApi };
