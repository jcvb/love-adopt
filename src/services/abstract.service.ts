import axios from "axios";

import { ABSTRACT_API_URL, API_KEY, API_URL } from "../utils/constants";

const getZipCode = () => {
  console.log(ABSTRACT_API_URL)
  console.log(API_KEY)
  console.log(API_URL)
  return axios
    .get(
      ABSTRACT_API_URL + "?api_key=" + API_KEY,
      
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response?.status;
    });
};

const AbstractService = {
  getZipCode,

};

export default AbstractService;
