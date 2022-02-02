import { createSelector } from '@reduxjs/toolkit';
import { selectUsersStore } from '.';

const selectAuthStore = createSelector(selectUsersStore, (usersStore) => usersStore.auth);

export const selectAuthToken = createSelector(selectAuthStore, (authStore) => authStore.authToken);

export const selectLastUpdate = createSelector(
    selectAuthStore,
    (authStore) => authStore.lastUpdated,
);
