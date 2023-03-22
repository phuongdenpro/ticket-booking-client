import Cookies from "js-cookie";
import axiosClient from "./axios";

class GroupTicketApi {
  getAll(params) {
    const url = "ticket-group";
    const res = axiosClient.get(url, {
      params: {
        sort: "ASC",
        ...params,
      },
    });
    return res;
  }
  create(params) {
    const url = `ticket-group`;
    const res = axiosClient.post(url, {
      ...params,
    });
    return res;
  }
  update(id, params) {
    const url = `ticket-group/id/${id}`;
    const res = axiosClient.patch(url, {
      ...params,
    });
    return res;
    
  }
  
  deleteById(id, params) {
    const url = `ticket-group/id/${id}`;
    const res = axiosClient.delete(url, params);
    return res;
  }
}
export { GroupTicketApi };
