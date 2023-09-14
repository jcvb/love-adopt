import axios from "axios";

import { API_URL } from "../utils/constants";
import { Breed } from "../types/Dogs";
import qs from "qs";

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

const getBestMatch = async (favorites: any) => {
  const dataDogs: any = await axios.post(API_URL + "/dogs/match", favorites, {
    withCredentials: true,
  });

  const dataDog:any = await axios.post(API_URL + "/dogs", [dataDogs.data.match], {
    withCredentials: true,
  });
  return dataDog.data[0];
};

const getDogsData = async (
  query: Array<string>,
  orderBy: string = "asc",
  filterBy: string = "breed",
  size: number = 25,
  page: number = 1,
  ageMin: number = 0,
  ageMax: number = 14
) => {
  let querySorted = [...query].sort((a: string, b: string) =>
    a.localeCompare(b)
  );
  let total: number = 0;
  let next: string = "";

  try {
    let params = {};
    if (querySorted[0] !== "" && querySorted.length > 0) {
      params = {
        breeds: querySorted,
        sort: filterBy + ":" + orderBy,
        size,
        from: page * size,
        ageMin,
        ageMax,
      };
    } else {
      params = {
        sort: filterBy + ":" + orderBy,
        size,
        from: page * size,
        ageMin,
        ageMax,
      };
    }

    const dogsIds = await axios.get(API_URL + "/dogs/search", {
      withCredentials: true,
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });

    const dataDogs = await axios.post(
      API_URL + "/dogs",
      dogsIds.data.resultIds,
      {
        withCredentials: true,
      }
    );

    total = dogsIds.data.total;
    next = dogsIds.data.next;

    return { data: dataDogs.data, total, next };
  } catch (error) {
    console.error("Error: ", error);
    return {
      data: [],
      total: 0,
      next: "",
      errorMessage: "There was an error fetching data",
    };
  }
};

const DogsService = {
  breeds,
  getDogsData,
  getBestMatch,
};

export default DogsService;
