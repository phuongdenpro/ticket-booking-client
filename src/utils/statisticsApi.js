import Cookies from "js-cookie";
import axiosClient from "./axios";

class StatisticsApi {
  statistics(params) {
    const url = "statistics";
    const res = axiosClient.get(url, {
      params: {
        type: "week",
        ...params,
      },
    });
    return res;
  }
}
export { StatisticsApi };
