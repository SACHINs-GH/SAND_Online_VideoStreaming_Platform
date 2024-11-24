import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import watchVideoReducer from '../features/watchVideoSlice';
import SearchReducer from '../features/seachesdData'

const store = configureStore({
    reducer: {
        auth: authReducer,
        watch: watchVideoReducer,
        search:SearchReducer
    }
});

export default store;
