import axios from "axios";

import { API_URL } from "../utils/constants";
import { Breed } from "../types/Dogs";

const breeds = () => {
  return axios
    .get(API_URL + "/dogs/breeds", {
      withCredentials: true,
    })
    .then((response) => {
      let breeds: Array<Breed> = [];
      response.data.forEach((element: any) => {
        breeds.push({ name: element, key: element.replaceAll(" ", "_") });
      });
      return breeds;
    })
    .catch((error) => {
      return error.response?.status;
    });
};

const getDogsIds = async (query: Array<string>) => {
  try {
    const dogsIds = await axios.get(API_URL + "/dogs/search", {
      withCredentials: true,
      params: {
        breeds: query,
      },
    });

    const dataDogs = await axios.post(
      API_URL + "/dogs",
      dogsIds.data.resultIds,
      {
        withCredentials: true,
      }
    );

    return dataDogs.data;
  } catch (error) {
    console.error("Hubo un error al obtener los datos:", error);
  }
  return axios
    .get(API_URL + "/dogs/search", {
      withCredentials: true,
      params: {
        breeds: query,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      return error.response?.status;
    });
};

const DogsService = {
  breeds,
  getDogsIds,
};

export default DogsService;
