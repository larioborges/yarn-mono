import passwordValidatorLib from 'password-validator';

const passwordValidatorInternal = new passwordValidatorLib();
passwordValidatorInternal
    .is()
    .min(8)
    .is()
    .max(50)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .symbols(1)
    .has()
    .not()
    .spaces();

export const passwordErrorMsg =
    'Your password needs to contain at least 1 uppercase letter, 1 lower case letter, 1 digit and 1 symbol. The length needs to be between 8 and 50.';

export const validatePassword = (value, { message = '' } = {}) => {
    if (!passwordValidatorInternal.validate(value)) {
        return message || passwordErrorMsg;
    }

    return '';
};
