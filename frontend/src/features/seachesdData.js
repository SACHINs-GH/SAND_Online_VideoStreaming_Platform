
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchedData:null
};

const SearchSlice= createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchedData: (state, action) => {
            console.log(action.payload.searchedData)
            state.searchedData= action.payload.searchedData;
        }
    }
});

export const { setSearchedData } = SearchSlice.actions;
export default SearchSlice.reducer;
