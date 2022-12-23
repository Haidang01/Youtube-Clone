import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../userAPI'

export const getAllVideos = createAsyncThunk(
  'profiles/getAllVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUserVideos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const getVideosLiked = createAsyncThunk(
  'profiles/getVideosLiked',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getVideosLikes();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const getListUserSub = createAsyncThunk(
  'profiles/getListUserSub',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.listUserSub();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const getListVideoSaved = createAsyncThunk(
  'profiles/getListVideoSaved',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getVideosSaved();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
const initialState = {
  AllUserVideos: [],
  videosLiked: [],
  UsersSub: [],
  VideosSaved: [],
  loading: false,
  error: false,
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saved: (state, action) => {
      const listId = state.VideosSaved.map(item => item._id);
      if (listId.includes(action.payload._id)) {
        state.VideosSaved.splice(
          listId.findIndex(channelId => channelId === action.payload._id), 1
        )
      } else {
        state.VideosSaved.push(action.payload);
      }
    },
    deleteVideo: (state, action) => {
      const listId = state.AllUserVideos.map(item => item._id);
      state.AllUserVideos.splice(listId.findIndex(id => id === action.payload._id), 1);
    }

  },
  extraReducers: {
    [getAllVideos.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllVideos.fulfilled]: (state, action) => {
      state.loading = false;
      state.AllUserVideos = action.payload;
    },
    [getAllVideos.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getVideosLiked.pending]: (state, action) => {
      state.loading = true;
    },
    [getVideosLiked.fulfilled]: (state, action) => {
      state.loading = false;
      state.videosLiked = action.payload;
    },
    [getVideosLiked.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getListUserSub.pending]: (state, action) => {
      state.loading = true;
    },
    [getListUserSub.fulfilled]: (state, action) => {
      state.loading = false;
      state.UsersSub = action.payload;
    },
    [getListUserSub.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getListVideoSaved.pending]: (state, action) => {
      state.loading = true;
    },
    [getListVideoSaved.fulfilled]: (state, action) => {
      state.loading = false;
      state.VideosSaved = action.payload;
    },
    [getListVideoSaved.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  }
});


// Action creators are generated for each case reducer function
export const { saved, deleteVideo } = profileSlice.actions

export default profileSlice.reducer