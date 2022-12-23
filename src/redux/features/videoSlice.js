import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../userAPI'

export const getVideoId = createAsyncThunk(
  'videos/getVideoId',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await api.getVideoById(videoId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
}
export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(userId => userId === action.payload)
          , 1
        )
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(userId => userId === action.payload)
          , 1
        )
      }
    },
    addView: (state, action) => {
      state.currentVideo.views = action.payload;
    },
    setCurrentVideoNull: (state, action) => {
      state.currentVideo = null;
    }
  },
  extraReducers: {
    [getVideoId.pending]: (state, action) => {
      state.loading = true;
    },
    [getVideoId.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    [getVideoId.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  }
});


// Action creators are generated for each case reducer function
export const { like, dislike, addView, setCurrentVideoNull } = videoSlice.actions

export default videoSlice.reducer