import axios from "axios";

import { API_URL } from "../utils/constants";

const breeds = () => {
  return axios
    .get(API_URL + "/dogs/breeds", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response?.status;
    });
};

const DogsService = {
  breeds,
};

export default DogsService;
