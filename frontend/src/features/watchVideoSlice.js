
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    videoObject: null, 
};
export const watchVideoSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        watchVideo: (state, action) => {
            state.videoObject = action.payload.videoObject;
        },
    },
});
export const { watchVideo } = watchVideoSlice.actions;
export default watchVideoSlice.reducer;
