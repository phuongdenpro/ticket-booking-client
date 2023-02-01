import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

const axiosApi = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
},
});

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default axiosApi;
