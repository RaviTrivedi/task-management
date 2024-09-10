import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface taskState {
    id: string;
    title: string;
    description: string;
    status: string
}

// Define the initial state using that type
const initialState: taskState[] = [
    { id: '1', title: 'Task 1', description: 'This is the first task.', status: "pending" },
    { id: '2', title: 'Task 2', description: 'Establish a daily team meeting to allow problems.', status: "pending" },
    { id: '3', title: 'Task 3', description: 'Update the safety calendar to track performance', status: "pending" },
    { id: '4', title: 'Task 4', description: 'Implement monthly production plan', status: "pending" },
]

export const taskSlice = createSlice({
    name: 'task',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        updateTask: (state, action) => {
            const { id, title, description, status } = action.payload
            const existingTask = state.find((task: taskState) => task.id === id)
            if (existingTask) {
                existingTask.title = title
                existingTask.description = description
                existingTask.status = status
            }
        },
        deleteTask: (state, action) => {
            const { id } = action.payload
            return state.filter((task) => task.id !== id)
        }
    },
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer