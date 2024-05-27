/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store/store";
import { Program } from "./types/Program";
import axios from "axios";

interface AppState {
  programs: Program[];
  loading: boolean;
}

export const initialState: AppState = {
  programs: [],
  loading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSampleData: any = createAsyncThunk(
  "app/getSampleData",
  async () => {
    const response = await axios.get<Program[]>("/sampleData.json", {
      headers: {
        Accept: "application/json",
      },
      transformResponse: [(data) => JSON.parse(data)],
    });
    return response.data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSampleData.pending, (state: AppState, action: any) => {
        state.loading = true;
      })
      .addCase(getSampleData.fulfilled, (state: AppState, action: any) => {
        state.loading = false;
        state.programs = action.payload;
      })
      .addCase(getSampleData.rejected, (state: AppState, action: any) => {
        state.loading = false;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.actions;

export const selectProgramById = createSelector(
  (state: RootState) => state.app.programs,
  (_, id: number) => id,
  (programs: Program[], id: number) => programs.find((program) => program.id === id)
);

export default appSlice.reducer;
