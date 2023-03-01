import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserLoginState {
  name: string;
  email: string;
  picture: string;
}
interface UserState {
  login : boolean;
  user : UserLoginState;
}

const initialState: UserState = {
  login: false,
  user: {
    name: '',
    email: '',
    picture: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoginState>) => {
      state.user = action.payload;
    },
    setLogin : (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    }
  }
});

export const { setUser,setLogin } = userSlice.actions;
export default userSlice.reducer;