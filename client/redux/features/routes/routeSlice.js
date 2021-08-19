import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routes: [],
};

const routeSlice = createSlice({
  name: 'routers',
  initialState,
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
  },
});

export const { setRoutes } = routeSlice.actions;
export default routeSlice.reducer;
