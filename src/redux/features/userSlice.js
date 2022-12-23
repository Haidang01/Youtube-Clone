import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../userAPI'

export const Login = createAsyncThunk(
  'users/login',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.login(data);
      navigate('/');
      toast.success('Login Success')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const LoginGoogle = createAsyncThunk(
  'users/google',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signInWithGoogle(data);
      navigate('/');
      toast.success('Login Success')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const Signup = createAsyncThunk(
  'users/Signup',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signup(data);
      toast.success('User created successfully')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false
      localStorage.clear();
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(channelId => channelId === action.payload), 1
        )
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    }
  },
  extraReducers: {
    [Login.pending]: (state, action) => {
      state.loading = true;
    },
    [Login.fulfilled]: (state, action) => {
      state.loading = false;
      const { token, others } = action.payload;
      state.currentUser = others;
      localStorage.setItem('access_token', token);
    },
    [Login.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [LoginGoogle.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginGoogle.fulfilled]: (state, action) => {
      state.loading = false;
      const { token, others } = action.payload;
      state.currentUser = others;
      localStorage.setItem('access_token', token);
    },
    [LoginGoogle.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [Signup.pending]: (state, action) => {
      state.loading = true;
    },
    [Signup.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Signup.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});


// Action creators are generated for each case reducer function
export const { subscription, logout } = userSlice.actions

export default userSlice.reducer