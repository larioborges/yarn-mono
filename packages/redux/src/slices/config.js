import { createSlice } from '@reduxjs/toolkit';

const REDUCER_NAME = 'config';

export const initialState = {
    apiBaseUrl: '',
};

export const configSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        setConfigApiBaseUrl: (state, action) => {
            state.apiBaseUrl = action.payload;
        },
    },
});

export const { setConfigApiBaseUrl } = configSlice.actions;

export const configReducer = configSlice.reducer;
