import { createSelector } from '@reduxjs/toolkit';
import { selectUsersStore } from '.';
import { PROMISE_STATUS } from '../../constants';

const selectSignupStore = createSelector(selectUsersStore, (usersStore) => usersStore.signup);

// First Name
export const selectFirstName = createSelector(selectSignupStore, (signupStore) => signupStore.firstName);
export const selectFirstNameError = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.firstNameError,
);

export const selectFirstNameValid = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.firstNameError === '',
);

// Last Name
export const selectLastName = createSelector(selectSignupStore, (signupStore) => signupStore.lastName);
export const selectLastNameError = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.lastNameError,
);

export const selectLastNameValid = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.lastNameError === '',
);

// Email Address
export const selectEmailAddress = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.emailAddress,
);
export const selectEmailAddressError = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.emailAddressError,
);
export const selectEmailAddressValid = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.emailAddressError === '',
);
// Password
export const selectPassword = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.password,
);
export const selectPasswordError = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.passwordError,
);
export const selectPasswordValid = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.passwordError === '',
);
// Recaptcha
export const selectRecaptcha = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.recaptcha,
);
// Agree to terms
export const selectAgreeToTerms = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.agreeToTerms,
);
// Signup ServerError
export const selectSubmitError = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.submitError,
);
// Submit Related
export const selectSignupRequestJson = createSelector(
    selectFirstName,
    selectLastName,
    selectEmailAddress,
    selectPassword,
    selectRecaptcha,
    selectAgreeToTerms,
    (firstName, lastName, emailAddress, password, recaptcha, agreeToTerms) => ({
        firstName,
        lastName,
        emailAddress,
        password,
        recaptcha,
        agreeToTerms,
    }),
);
const selectSubmitStatus = createSelector(
    selectSignupStore,
    (signupStore) => signupStore.submitStatus,
);
export const selectSignupSubmitEnabled = createSelector(
    selectFirstNameValid,
    selectLastNameValid,
    selectEmailAddressValid,
    selectPasswordValid,
    selectAgreeToTerms,
    (nameValid, emailValid, passwordValid, agreeToTerms) =>
        nameValid && emailValid && passwordValid && agreeToTerms,
);
export const selectSignupInputDisabled = createSelector(
    selectSubmitStatus,
    (submitStatus) =>
        submitStatus === PROMISE_STATUS.PENDING || submitStatus === PROMISE_STATUS.SUCCESS,
);
