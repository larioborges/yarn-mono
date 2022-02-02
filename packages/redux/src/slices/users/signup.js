import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createExpireHandler } from '../../expire/util';
import { post } from '../../fetch';
import { validationActions } from '../../validation/util';
import { selectSignupRequestJson } from '../../selectors/users/signup';
import { setAuthToken } from './auth.js';
import { getApiUrl } from '../../selectors/config';
import {
    matchFormSetAction,
    matchReducerAction,
    setLastUpdated,
    resetSubmitError,
    initState,
    handleFormSubmit,
    SUBMIT_STATE_FIELDS,
} from '../util';

const REDUCER_NAME = 'signup';

export const submitSignup = createAsyncThunk(`${REDUCER_NAME}/submit`, async (_, thunkAPI) => {
    const signupSubmitPayload = selectSignupRequestJson(thunkAPI.getState());
    const signupEndpoint = getApiUrl(thunkAPI.getState(), '/users/signup');
    try {
        const response = await post(signupEndpoint, signupSubmitPayload);
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

export const { setError: setSignupFirstNameError, setValue: setSignupFirstName } = validationActions(
    REDUCER_NAME,
    'firstName',
    {
        required: true,
        length: {
            min: 2,
            max: 30,
        },
    },
);

export const { setError: setSignupLastNameError, setValue: setSignupLastName } = validationActions(
    REDUCER_NAME,
    'lastName',
    {
        required: true,
        length: {
            min: 2,
            max: 30,
        },
    },
);

export const { setError: setSignupEmailError, setValue: setSignupEmail } = validationActions(
    REDUCER_NAME,
    'email',
    {
        required: true,
        email: true,
    },
);

export const { setError: setSignupPasswordError, setValue: setSignupPassword } = validationActions(
    REDUCER_NAME,
    'password',
    {
        required: true,
        password: true,
    },
);

export const initialState = initState({
    firstName: '',
    firstNameError: null,
    lastName: '',
    lastNameError: null,
    emailAddress: '',
    emailAddressError: null,
    password: '',
    passwordError: null,
    recaptcha: '',
    agreeToTerms: false,
})
    .withFormSubmit()
    .withLastUpdated()
    .getState();

const getResetState = (state) => ({
    ...state,
    ...initialState,
});

export const signupSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        resetState: (state) => getResetState(state),
        setSignupRecaptcha: (state, action) => {
            state.recaptcha = action.payload;
        },
        toggleAgreeToTerms: (state) => {
            state.agreeToTerms = !state.agreeToTerms;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setSignupFirstName, (state, action) => {
                state.firstName = action.payload.value;
            })
            .addCase(setSignupFirstNameError, (state, action) => {
                state.firstNameError = action.payload;
            })
            .addCase(setSignupLastName, (state, action) => {
                state.lastName = action.payload.value;
            })
            .addCase(setSignupLastNameError, (state, action) => {
                state.lastNameError = action.payload;
            })
            .addCase(setSignupEmail, (state, action) => {
                state.emailAddress = action.payload.value;
            })
            .addCase(setSignupEmailError, (state, action) => {
                state.emailAddressError = action.payload;
            })
            .addCase(setSignupPassword, (state, action) => {
                state.password = action.payload.value;
            })
            .addCase(setSignupPasswordError, (state, action) => {
                state.passwordError = action.payload;
            })
            .addCase(submitSignup.pending, (state) => handleFormSubmit.pendingState(state))
            .addCase(submitSignup.fulfilled, (state) =>
                handleFormSubmit.fulfilledState(getResetState(state)),
            )
            .addCase(submitSignup.rejected, (state, action) =>
                handleFormSubmit.rejectedState(state, action.payload),
            )
            .addMatcher(matchReducerAction(REDUCER_NAME), setLastUpdated())
            .addMatcher(matchFormSetAction(REDUCER_NAME), resetSubmitError());
    },
});

export const { setSignupRecaptcha, toggleAgreeToTerms, resetState } = signupSlice.actions;

export const signupExpireHandler = createExpireHandler(REDUCER_NAME, resetState);

const persistConfig = {
    key: REDUCER_NAME,
    version: 1,
    storage,
    blacklist: ['password', 'passwordError', 'recaptcha', 'agreeToTerms', ...SUBMIT_STATE_FIELDS],
};

export const signupReducer = persistReducer(persistConfig, signupSlice.reducer);
