import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isAuthenticated } from '../auth';
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
  login: isAuthenticated(),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {
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