import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DogsService from "../services/dogs.service";

export const fetchBreeds = createAsyncThunk("dogs/fetchBreeds", async () => {
  const response = await DogsService.breeds();
  return response;
});

export const fetchDataDogs = createAsyncThunk(
  "dogs/fetchDataDogs",
  async (selectedBreeds: any) => {
    const response = await DogsService.getDogsData(
      selectedBreeds.map((breed: any) => breed.name)
    );
    return response;
  }
);

const dogsSlice = createSlice({
  name: "dogs",
  initialState: { breeds: [], selectedBreeds: [], dataDogs: [], status: "idle", error: null },
  reducers: {
    setBreeds: (state, action) => {
      state.breeds = action.payload;
    },
    setSelectedBreeds: (state, action) => {
      state.selectedBreeds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.breeds = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDataDogs.fulfilled, (state, action) => {
        state.dataDogs = action.payload;
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
export const { setSelectedBreeds, setBreeds } = dogsSlice.actions;
