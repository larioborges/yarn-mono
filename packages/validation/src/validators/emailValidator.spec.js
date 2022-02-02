const { expect, test } = require('@jest/globals');
const { validateEmail, emailErrorMsg } = require('./emailValidator');

test('Valid Email - no error msg', () => {
    expect(validateEmail('lario@xosports.com')).toEqual('');
});

test('Invalid Email - error msg', () => {
    expect(validateEmail('lario@xosports')).toEqual(emailErrorMsg);
});
