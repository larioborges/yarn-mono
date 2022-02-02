import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createExpireHandler } from '../../expire/util';
import { matchReducerAction, setLastUpdated, initState } from '../util';

const REDUCER_NAME = 'auth';

export const initialState = initState({
    authToken: null,
})
    .withLastUpdated()
    .getState();

export const authSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        resetState: (state) => {
            return {
                ...state,
                ...initialState,
            };
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(matchReducerAction(REDUCER_NAME), setLastUpdated());
    },
});

export const { setAuthToken, resetState } = authSlice.actions;

export const authExpireHandler = createExpireHandler(REDUCER_NAME, resetState);

const persistConfig = {
    key: REDUCER_NAME,
    version: 1,
    storage,
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
