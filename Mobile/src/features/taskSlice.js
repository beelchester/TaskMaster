import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  tasks : []
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    initialTasks : (state, action) => {
      state.tasks = action.payload;
    }
  }
});

export const { addTask, editTask, deleteTask, initialTasks } = taskSlice.actions;

export default taskSlice.reducer;
