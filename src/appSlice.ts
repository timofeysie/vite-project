import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store/store";
import { Program } from "./types/Program";
import axios from "axios";

interface AppState {
  programs: Program[];
}

export const initialState: AppState = {
  programs: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSampleData: any = createAsyncThunk(
  "app/getSampleData",
  async () => {
    const response = await axios.get<Program[]>("sampleData.json", {
      headers: {
        Accept: "application/json",
      },
      transformResponse: [(data) => JSON.parse(data)],
    });
    console.log("response", response.data);
    return response.data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state;

export default appSlice.reducer;
