import { createSelector } from '@reduxjs/toolkit';
import { selectUsersStore } from '.';
import { PROMISE_STATUS } from '../../constants';

const selectLoginStore = createSelector(selectUsersStore, (usersStore) => usersStore.login);

// Email Address
export const selectEmailAddress = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.emailAddress,
);
export const selectEmailAddressError = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.emailAddressError,
);
export const selectEmailAddressValid = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.emailAddressError === '',
);
// Password
export const selectPassword = createSelector(selectLoginStore, (loginStore) => loginStore.password);
export const selectPasswordError = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.passwordError,
);
export const selectPasswordValid = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.passwordError === '',
);
// Recaptcha
export const selectRecaptcha = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.recaptcha,
);
// Signup ServerError
export const selectSubmitError = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.submitError,
);
// Submit Related
export const selectLoginRequestJson = createSelector(
    selectEmailAddress,
    selectPassword,
    selectRecaptcha,
    (emailAddress, password, recaptcha) => ({
        emailAddress,
        password,
        recaptcha,
    }),
);
const selectSubmitStatus = createSelector(
    selectLoginStore,
    (loginStore) => loginStore.submitStatus,
);
export const selectLoginSubmitEnabled = createSelector(
    selectEmailAddressValid,
    selectPasswordValid,
    (emailValid, passwordValid) => emailValid && passwordValid,
);
export const selectLoginInputDisabled = createSelector(
    selectSubmitStatus,
    (submitStatus) =>
        submitStatus === PROMISE_STATUS.PENDING || submitStatus === PROMISE_STATUS.SUCCESS,
);
