import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getUser } from '../api';

// GET запрос на пользователя
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const response = await getUser();
    return response.user; // обращаемся к user внутри объекта
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;