const { expect, test } = require('@jest/globals');

const {
    initialState,
    signupReducer,
    setSignupRecaptcha,
    setSignupEmail,
    // submitSignup,
} = require('./signup');

test('Initial State', () => {
    expect(signupReducer(initialState, {})).toEqual(initialState);
});

test('setSignupRecaptcha should set the value of RECAPTCHA_AUTH.', () => {
    expect(signupReducer(initialState, setSignupRecaptcha('ASD431FVW'))).toEqual({
        ...initialState,
        recaptcha: 'ASD431FVW',
    });
});

test('setSignupEmail should set the value of emailAddress.', () => {
    expect(signupReducer(initialState, setSignupEmail('peter@xosports.co.za'))).toEqual({
        ...initialState,
        emailAddress: 'peter@xosports.co.za',
    });
});

// test('submitSignup should set the value of emailAddress.', () => {
//     expect(signupReducer(
//         initialState,
//         setSignupEmail('peter@xosports.co.za'),
//     )).toEqual({
//         ...initialState,
//         emailAddress: 'peter@xosports.co.za',
//     });
// });
