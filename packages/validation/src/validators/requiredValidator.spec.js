const { expect, test } = require('@jest/globals');
const { validateRequired, requiredErrorMsg } = require('./requiredValidator');

test('Required Error', () => {
    expect(validateRequired('')).toEqual(requiredErrorMsg);
});

test('Required Success', () => {
    expect(validateRequired('3dSfsvewd')).toEqual('');
});
