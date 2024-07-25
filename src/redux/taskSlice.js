import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({ id: action.payload._id, task: action.payload.task, completed: action.payload.completed });
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        completeTask: (state, action) => {
            const task = state.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        setTasks: (state, action) => {
            return action.payload;
        },
        updateTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload._id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    }
});

export const { addTask, deleteTask, completeTask, setTasks, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
