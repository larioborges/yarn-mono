export const getMinErrorMsg = (length) => `Minimum ${length} characters allowed!`;
export const getMaxErrorMsg = (length) => `Maximum ${length} characters allowed!`;

// TODO Improve this
export const validateLength = (value, { min, max, message = '' } = {}) => {
    if (min != null && value.length < min) {
        return message || getMinErrorMsg(min);
    }

    if (max != null && value.length > max) {
        return message || getMaxErrorMsg(max);
    }

    return '';
};
