import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DogsService from "../services/dogs.service";

export const fetchBreeds = createAsyncThunk("dogs/fetchBreeds", async () => {
  const response = await DogsService.breeds();
  return response;
});

export const fetchDataDogs = createAsyncThunk(
  "dogs/fetchDataDogs",
  async ({
    selectedBreeds,
    orderBy,
    filterBy,
    itemsPeerPage,
    page,
    ageMin,
    ageMax,
  }: {
    selectedBreeds: any;
    orderBy: any;
    filterBy: any;
    itemsPeerPage: any;
    page: any;
    ageMin: any;
    ageMax: any;
  }) => {
    const response = await DogsService.getDogsData(
      selectedBreeds.map((breed: any) => breed.name),
      orderBy,
      filterBy,
      itemsPeerPage,
      page,
      ageMin,
      ageMax
    );
    return response;
  }
);

const dogsSlice = createSlice({
  name: "dogs",
  initialState: {
    breeds: [],
    selectedBreeds: [],
    dataDogs: [],
    total: 0,
    page: 1,
    ageMin: 0,
    ageMax: 14,
    zipCode: " ",
    itemsPeerPage: 9,
    orderBy: "asc",
    filterBy: "breed",
    status: "idle",
    error: null,
  },
  reducers: {
    setBreeds: (state, action) => {
      state.breeds = action.payload;
    },
    setSelectedBreeds: (state, action) => {
      state.selectedBreeds = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setItemsPeerPage: (state, action) => {
      state.itemsPeerPage = action.payload;
    },
    setAgeMin: (state, action) => {
      state.ageMin = action.payload;
    },
    setAgeMax: (state, action) => {
      state.ageMax = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.breeds = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDataDogs.fulfilled, (state, action) => {
        state.dataDogs = action.payload.data;
        state.total = action.payload.total;
        state.status = "succeeded";
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(fetchDataDogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      });
  },
});

export default dogsSlice.reducer;
export const {
  setSelectedBreeds,
  setBreeds,
  setOrderBy,
  setFilterBy,
  setTotal,
  setItemsPeerPage,
  setPage,
  setAgeMin,
  setAgeMax
} = dogsSlice.actions;
