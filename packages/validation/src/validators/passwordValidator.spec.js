const { expect, test } = require('@jest/globals');
const { validatePassword, passwordErrorMsg } = require('./passwordValidator');

test('Invalid Password - too long', () => {
    expect(
        validatePassword(
            'Ds@1jkfdkdasfdsfsdDs@1jkfdkdasfdsfsdDs@1jkfdkdasfdsfsdDs@1jkfdkdasfdsfsdDs@1jkfdkdasfdsfsd',
        ),
    ).toEqual(passwordErrorMsg);
});

test('Invalid Password - no special character', () => {
    expect(validatePassword('3dSfsvewd')).toEqual(passwordErrorMsg);
});

test('Invalid Password - no digit', () => {
    expect(validatePassword('@dSfsvewd')).toEqual(passwordErrorMsg);
});

test('Invalid Password - no uppercase', () => {
    expect(validatePassword('@d2fsvewd')).toEqual(passwordErrorMsg);
});

test('Invalid Password - no lowercase', () => {
    expect(validatePassword('@D2FSVEWD')).toEqual(passwordErrorMsg);
});

test('Invalid Password - contains space', () => {
    expect(validatePassword('3dSfsvewd@ ')).toEqual(passwordErrorMsg);
});

test('Valid Password', () => {
    expect(validatePassword('3dSfsvewd@')).toEqual('');
});
