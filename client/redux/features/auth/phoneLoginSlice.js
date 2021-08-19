import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: ['asdsa'],
  status: 'idle',
  error: null,
};

export const currentUserSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.user += action.payload;
    },
  },
});

export const { setAuthToken } = currentUserSlice.actions;

export default currentUserSlice.reducer;
