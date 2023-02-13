import axiosClient from "./axios";

class WardApi {
    getWardByDistrictId(id,params) {
        const url = `ward?districtCode=${id}&isAll=true`;
        const res = axiosClient.get(url,{
          params: {
            ...params,
          },
        });
        return res;
      }
  }
  
  export { WardApi };
  