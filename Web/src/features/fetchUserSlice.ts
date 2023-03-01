import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const fetchUserSlice = createSlice({
  name: 'fetchUser',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {fetchUserStart, fetchUserSuccess, fetchUserFailure} = fetchUserSlice.actions;
export default fetchUserSlice.reducer;