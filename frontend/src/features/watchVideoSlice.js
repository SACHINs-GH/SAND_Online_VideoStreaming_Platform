
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    videoObject: null, 
    place:null
};
export const watchVideoSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        watchVideo: (state, action) => {
            state.videoObject = action.payload.videoObject;
        },
        place:(state,action)=>{
            state.place = action.payload.place;
        }
    },
});
export const { watchVideo ,place} = watchVideoSlice.actions;
export default watchVideoSlice.reducer;
