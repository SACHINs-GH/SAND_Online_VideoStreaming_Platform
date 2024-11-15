// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

const initialState = {
    user: storedUser || null,
    accessToken: storedAccessToken || null,
    refreshToken: storedRefreshToken || null,
    isAuthenticated: Boolean(storedUser && storedAccessToken),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        clearAuth: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // Remove from localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
