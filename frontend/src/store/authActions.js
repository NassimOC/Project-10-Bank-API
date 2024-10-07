import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        {
          email,
          password,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (rememberMe) {
        localStorage.setItem('token', response.data.body.token);
      } else {
        sessionStorage.setItem('token', response.data.body.token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userProfile = createAsyncThunk(
  'auth/userProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUsername = createAsyncThunk(
  'auth/editUsername',
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
