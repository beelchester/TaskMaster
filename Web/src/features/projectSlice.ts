import {createSlice} from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  due: Date | String |null;
  priority: string;
  project: string;
  checked: boolean;
}

interface ProjectState {
  projectName: string;
  tasks: Todo[];
}

interface ProjectsState {
  projects: ProjectState[] ;
}

const initialState:  ProjectsState = {
  projects : []
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProject: (state, action) => {
      
      // state.projects.push(action.payload); //
      state.projects = action.payload;


    }
  }
});

export const {fetchProject} = projectSlice.actions;
export default projectSlice.reducer;