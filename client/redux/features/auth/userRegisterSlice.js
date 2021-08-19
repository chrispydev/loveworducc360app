import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../app/firebase/Firebase';

const initialState = {
  user: [],
  status: 'idle',
  error: null,
};

export const userRegister = createAsyncThunk('register-user', async (data) => {
  const res = await auth.createUserWithEmailAndPassword(
    data.email,
    data.password
  );
  const userProfile = await res.user.updateProfile({
    displayName: data.name,
    dateOfBirth: data.data,
    photoURL:
      data.imageUrl || 'https://chrispydev.vercel.app/images/banner.jpg',
  });
  return res.json;
});

const userRegisterSlice = createSlice({
  name: 'registers',
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.user = '';
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export const { cleanUp } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
