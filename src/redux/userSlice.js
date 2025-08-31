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
    },
    addExpenseToUser: (state, action) => {
      
    const expense = action.payload;
     if (state.user?.expenses) {
       state.user.expenses.unshift(action.payload); // добавляем новую трату
       
     } else {
       state.user.expenses = [action.payload];
     }

      // 2️⃣ обновляем баланс и траты
    if (expense.type === '+') {
      // если это доход
      state.user.balance += expense.amount;
      state.user.totalIncome += expense.amount;
    } else {
      // если это расход
      state.user.balance -= expense.amount;
      state.user.totalSpend += expense.amount;
      state.user.spendThisMonth = (state.user.spendThisMonth || 0) + expense.amount;
    }
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

export const { updateUser, addExpenseToUser } = userSlice.actions;
export default userSlice.reducer;