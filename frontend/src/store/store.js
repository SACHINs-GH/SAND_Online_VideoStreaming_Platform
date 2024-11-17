
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import watchVideoReducer from '../features/watchVideoSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        watch: watchVideoReducer, 
    }
});

export default store;
