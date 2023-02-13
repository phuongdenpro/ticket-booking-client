import axiosClient from "./axios";

class DistrictApi {
    getDistrictByProvinceId(id,params) {
        const url = `district?provinceCode=${id}&isAll=true`;
        const res = axiosClient.get(url,{
          params: {
            ...params,
          },
        });
        return res;
      }
  }
  
  export { DistrictApi };
  