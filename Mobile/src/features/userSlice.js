import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { isAuthenticated } from '../auth';

const initialState= {
  login: false,
  user:  {
    name: '',
    email: '',
    picture: ''
  } 
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogin : (state, action) => {
      state.login = action.payload;
    }
  }
});

export const { setUser,setLogin } = userSlice.actions;
export default userSlice.reducer;

