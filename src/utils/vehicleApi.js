import Cookies from "js-cookie";
import axiosClient from "./axios";

class VehicleApi {
  getAll(params) {
    const url = "vehicle";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  getType() {
    const url = "vehicle/vehicle-type";
    const res = axiosClient.get(url);
    return res;
  } 
}
export { VehicleApi };
