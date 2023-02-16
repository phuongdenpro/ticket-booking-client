import axiosClient from "./axios";

class UploadApi {
    uploadMutiFile(params) {
        const url = `upload/uploadMutiFile`;
        const res = axiosClient.post(url,params);
        return res;
      }
  }
  
  export { UploadApi };
  