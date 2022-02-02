const { expect, test } = require('@jest/globals');

const { initialState, loginReducer, setLoginEmail } = require('./login');

test('Initial State', () => {
    expect(loginReducer(initialState, {})).toEqual(initialState);
});

test('setLoginEmail should set the value of emailAddress.', () => {
    expect(loginReducer(initialState, setLoginEmail('peter@xosports.co.za'))).toEqual({
        ...initialState,
        emailAddress: 'peter@xosports.co.za',
    });
});
