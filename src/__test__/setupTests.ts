import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../features/task/taskSlice"

export const createMockStore = (initialState = {}) => {
    return configureStore({
        reducer: {
            tasks: taskReducer,
        },
        preloadedState: initialState
    })
}