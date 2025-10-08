import { createSlice } from '@reduxjs/toolkit';
import { Cookie } from '../../util/cookie.util';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../constant/common';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userId: '',
    userName: '',
    userAvatar: ''
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName || state.userName;
      state.userAvatar = action.payload.userAvatar || state.userAvatar;
    },
    logout: (state) => {
      Cookie.removeCookie(ACCESS_TOKEN_KEY, '/');
      Cookie.removeCookie(REFRESH_TOKEN_KEY, '/');
      state.isAuthenticated = false;
      state.userId = '';
      state.userName = '';
      state.userAvatar = '';
    },
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName || state.userName;
      state.userAvatar = action.payload.userAvatar || state.userAvatar;
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, logout, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
