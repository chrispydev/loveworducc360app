import { createSlice } from '@reduxjs/toolkit';

const userCacheSlice = createSlice({
  name: 'authentication',
  initialState: {
    auth: [''],
  },
  reducers: {
    userCache: (state, action) => {
      state.auth = action.payload;
    },
    cleanUp: (state) => {
      state.auth = '';
    },
  },
});

export const { userCache, cleanUp } = userCacheSlice.actions;
export default userCacheSlice.reducer;
