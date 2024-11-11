import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    accessToken:null,
    refereshToken:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth : (state,action)=>{
            state.user = action.payload.user,
            state.accessToken = action.payload.accessToken,
            state.refereshToken = action.payload.refereshToken,
            state.isAuthenticated = true
        },
        clearAuth:(state )=>{
            state.user  = null,
            state.accessToken = null,
            state.refereshToken = null,
            state.isAuthenticated = false
        }
    }
})
export const {setAuth,clearAuth} = authSlice.actions;
export default authSlice.reducer;