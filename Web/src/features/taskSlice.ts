import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasks } from '../../db';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  due: Date | String;
  priority: string;
  project: string;
  checked: boolean;
}

interface TaskState {
  tasks: Todo[];
}

const initialState: TaskState = {
  tasks
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Todo>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Todo>) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  }
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
