import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentPage:"Today"
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePage:(state,action) =>{
      state.currentPage = action.payload
    }
  },
});

export const {changePage} = pageSlice.actions
export default pageSlice.reducer