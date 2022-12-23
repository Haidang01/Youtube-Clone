import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../userAPI'

export const getcomments = createAsyncThunk(
  'comments/getcomments',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await api.GetComment(videoId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.AddComment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
const initialState = {
  comments: [],
  loading: false,
  error: false,
}
export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getcomments.pending]: (state, action) => {
      state.loading = true;
    },
    [getcomments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getcomments.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [addComment.pending]: (state, action) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [addComment.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});


// Action creators are generated for each case reducer function
// export const { like, dislike, addView, setCurrentcommentNull } = commentSlice.actions

export default commentSlice.reducer