import { validate as validateEmailInternal } from 'email-validator';

export const emailErrorMsg = 'Please enter a valid email address!';

export const validateEmail = (value, { message = '' } = {}) => {
    if (!validateEmailInternal(value)) {
        return message || emailErrorMsg;
    }

    return '';
};
