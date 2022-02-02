import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../../fetch';
import { validationActions } from '../../validation/util';
import { selectLoginRequestJson } from '../../selectors/users/login';
import { setAuthToken } from './auth.js';
import { getApiUrl } from '../../selectors/config';
import { matchFormSetAction, resetSubmitError, initState, handleFormSubmit } from '../util';

const REDUCER_NAME = 'login';

export const submitLogin = createAsyncThunk(`${REDUCER_NAME}/submit`, async (_, thunkAPI) => {
    const loginSubmitPayload = selectLoginRequestJson(thunkAPI.getState());
    const loginEndpoint = getApiUrl(thunkAPI.getState(), '/users/login');
    try {
        const response = await post(loginEndpoint, loginSubmitPayload);
        thunkAPI.dispatch(setAuthToken(response.authToken));
        return response;
    } catch (err) {
        const response = await err;
        thunkAPI.dispatch(setAuthToken(null));
        return thunkAPI.rejectWithValue(
            response.errorMsg ? response.errorMsg : 'An expected error occurred!',
        );
    }
});

export const { setError: setLoginEmailError, setValue: setLoginEmail } = validationActions(
    REDUCER_NAME,
    'email',
    {
        required: true,
        email: true,
    },
);

export const { setError: setLoginPasswordError, setValue: setLoginPassword } = validationActions(
    REDUCER_NAME,
    'password',
    {
        required: true,
    },
);

export const initialState = initState({
    emailAddress: '',
    emailAddressError: null,
    password: '',
    passwordError: null,
    recaptcha: '',
})
    .withFormSubmit()
    .getState();

export const loginSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        setLoginRecaptcha: (state, action) => {
            state.recaptcha = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setLoginEmail, (state, action) => {
                state.emailAddress = action.payload.value;
            })
            .addCase(setLoginEmailError, (state, action) => {
                state.emailAddressError = action.payload;
            })
            .addCase(setLoginPassword, (state, action) => {
                state.password = action.payload.value;
            })
            .addCase(setLoginPasswordError, (state, action) => {
                state.passwordError = action.payload;
            })
            .addCase(submitLogin.pending, (state) => handleFormSubmit.pendingState(state))
            .addCase(submitLogin.fulfilled, (state) => handleFormSubmit.fulfilledState(state))
            .addCase(submitLogin.rejected, (state, action) =>
                handleFormSubmit.rejectedState(state, action.payload),
            )
            .addMatcher(matchFormSetAction(REDUCER_NAME), resetSubmitError());
    },
});

export const { setLoginRecaptcha } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
