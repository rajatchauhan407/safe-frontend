import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// ReturnType is a utility in typescript that returns the type of the expression. In this case, it returns the type of store.getState() which is the type of the state of the store. In this case, it.

// 1. state
// 2. In the state, we have combineReducers. And one of them is auth reducer which gets its value from authReducer.
// 3. auth reducer is going to have the state (values)of authReducer
