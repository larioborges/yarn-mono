import { combineReducers } from '@reduxjs/toolkit';
import { signupReducer } from './signup';
import { loginReducer } from './login';
import { authReducer } from './auth';

export const usersReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    auth: authReducer,
});
