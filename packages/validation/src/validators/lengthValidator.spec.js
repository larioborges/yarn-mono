const { expect, test } = require('@jest/globals');
const { validateLength, getMinErrorMsg, getMaxErrorMsg } = require('./lengthValidator');

const minLength = 4;
const maxLength = 10;
const lengthOpts = { min: minLength, max: maxLength };

test('Min Valid', () => {
    expect(validateLength('12345', lengthOpts)).toEqual('');
});

test('Min Invalid', () => {
    expect(validateLength('12', lengthOpts)).toEqual(getMinErrorMsg(minLength));
});

test('Max Valid', () => {
    expect(validateLength('12345', lengthOpts)).toEqual('');
});

test('Max Invalid', () => {
    expect(validateLength('12345123456789', lengthOpts)).toEqual(getMaxErrorMsg(maxLength));
});
