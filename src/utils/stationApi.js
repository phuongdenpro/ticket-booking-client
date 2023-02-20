import Cookies from "js-cookie";
import axiosClient from "./axios";

class StationApi {
  getAllStations(params) {
    const url = "station";
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  getStationById(id, params) {
    const url = `station/id/${id}`;
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  createStation(params) {
    const url = `station`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }


  deleteStation(id, params) {
    const url = `station/id/${id}`;
    const res = axiosClient.get(url, {
      params: {
        ...params,
      },
    });
    return res;
  }

  deleteMultiple(params) {
    const url = "station/multiple";
    const res = axiosClient.delete(url, {
      data: {
        ...params,
      },
    });
    return res;
  }

  exportExcel(params) {
    const url = "station/export";
    const res = axiosClient.post(url, {
      data: {
        ...params,
      },
    });
    return res;
  }

}
export { StationApi };
