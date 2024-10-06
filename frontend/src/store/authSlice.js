import { createSlice } from '@reduxjs/toolkit';
import { editUsername, loginUser, userProfile } from './authActions';

const initialState = {
  userInfo: null,
  firstName: null,
  lastName: null,
  userName: null,
  token: null,
  loading: false,
  error: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState : initialState,
  reducers: {
      logout: (state) => {
        state.userInfo = null;
        state.token = null;
        state.loading = false;
        state.error = "";

        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      },
  },
  
  extraReducers: builder => {
    // User authentication
    builder.addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = "";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.body.token
        state.userInfo = payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });

    // Fetching user profile
    builder.addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });

    // Updating user profile
    builder.addCase(editUsername.pending, (state) => {
        state.loading = true;
        state.error = "";
    });
    builder.addCase(editUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
    });
    builder.addCase(editUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  }
});

export const { logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;