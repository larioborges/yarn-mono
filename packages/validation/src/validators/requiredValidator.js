export const requiredErrorMsg = 'This field is required';

export const validateRequired = (value, { message = '' } = {}) => {
    if (!value) {
        return message || requiredErrorMsg;
    }

    return '';
};
