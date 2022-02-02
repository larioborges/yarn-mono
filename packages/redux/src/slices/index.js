import { combineReducers } from '@reduxjs/toolkit';
import { usersReducer } from './users/index';
import { configReducer } from './config';

export const rootReducer = combineReducers({ users: usersReducer, config: configReducer });
