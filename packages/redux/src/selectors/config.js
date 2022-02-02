import { createSelector } from '@reduxjs/toolkit';

const selectConfigStore = (state) => state.config;

export const selectApiBaseUrl = createSelector(
    selectConfigStore,
    (configStore) => configStore.apiBaseUrl,
);

export const getApiUrl = (state, path) => {
    return `${selectApiBaseUrl(state)}${path}`;
};
