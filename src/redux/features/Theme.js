import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTheme: false,
}
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, actions) => {
      state.currentTheme = actions.payload;
    }
  },
});


// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions

export default themeSlice.reducer