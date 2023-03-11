import {createSlice} from '@reduxjs/toolkit';

const initialState   = {
  projects : []
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProject: (state, action) => {
      state.projects = action.payload;
    }
  }
});

export const {fetchProject} = projectSlice.actions;
export default projectSlice.reducer;