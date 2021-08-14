import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => { 

    return response;
  },
  (error) => {
    const expectedError = error.response;

    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      toast.error("Please verify server url");
    }
    if (
      error.response &&
      error.response.status >= 500 &&
      error.response.status < 600
    ) {
      toast.error("Please verify server execution");
    }
    if (!expectedError) {
      toast.error("An unexpected error occurrred");
      
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use((req) => {
  //console.log(`${req.method} ${req.url}`);  
  return req;
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
