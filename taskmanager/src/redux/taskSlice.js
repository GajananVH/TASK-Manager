import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: Array.isArray(JSON.parse(localStorage.getItem('tasks'))) ? JSON.parse(localStorage.getItem('tasks')) : [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, title, description, taskDuration } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.taskDuration = taskDuration;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
});

export const { addTask, editTask, deleteTask, toggleCompletion, reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
