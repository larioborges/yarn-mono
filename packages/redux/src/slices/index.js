import { combineReducers } from '@reduxjs/toolkit';
import { usersReducer } from './users/index';

export const rootReducer = combineReducers({ users: usersReducer });
