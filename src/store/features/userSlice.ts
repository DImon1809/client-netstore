import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userApi } from "../services/userApi";

import { IUser } from "../types";

export interface IinitialState {
  user: IUser | null;
  isAuthenticated: boolean;
  users: IUser[] | null;
  current: IUser | null;
  token?: string;
  isPrewievProfile: boolean;
}

const initialState: IinitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
  isPrewievProfile: true,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: () => initialState,

    resetUser: (state) => {
      state.user = null;
    },

    changePrewiev: (state, action: PayloadAction<boolean>) => {
      state.isPrewievProfile = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(
        userApi.endpoints.current.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isAuthenticated = true;
          state.current = action.payload;
        }
      )
      .addMatcher(
        userApi.endpoints.getUserByID.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
        }
      );
  },
});

export const { logout, resetUser, changePrewiev } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
