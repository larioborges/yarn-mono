const { expect, test } = require('@jest/globals');

const { isMeasurement } = require('./util');

test('Pixel measurement', () => {
    expect(isMeasurement('900px')).toEqual(true);
});

test('Pixel measurement fail', () => {
    expect(isMeasurement('px')).toEqual(false);
});

test('Pixel measurement', () => {
    expect(isMeasurement('2px')).toEqual(true);
});

test('Non-measurement string`', () => {
    expect(isMeasurement('Hello')).toEqual(false);
});
