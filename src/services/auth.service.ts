import axios from "axios";

import { API_URL } from "../utils/constants";

const login = (name: string, email: string) => {
  return axios
    .post(
      API_URL + "/auth/login",
      {
        name,
        email,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data === "OK") return 200;
    })
    .catch((error) => {
      return error.response?.status;
    });
};

const AuthService = {
  login,
};

export default AuthService;
