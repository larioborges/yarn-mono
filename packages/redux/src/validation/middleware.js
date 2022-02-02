import { validators } from '@lario/validation';
import debounce from 'lodash.debounce';

const validateForType = (validator, value, validatorTypeConfig) => {
    if (!validatorTypeConfig) return '';

    if (typeof validatorTypeConfig === 'boolean') {
        // If the validator config is true - the validator will be used with the default config
        return validator(value);
    }
    // Otherwise the config is actually a JSON configuration
    return validator(value, validatorTypeConfig);
};

const validate = (value, validationConfig) => {
    if (!validationConfig) return '';

    for (let validationType in validators) {
        const validatorTypeConfig = validationConfig[validationType];
        const validator = validators[validationType];
        const errMsg = validateForType(validator, value, validatorTypeConfig);
        if (errMsg) return errMsg;
    }

    return '';
};

const debouncingSetErrorList = {};
const currentErrMsgMap = {};

const setErrorDebounced = (dispatch, errorActionType, errorMsg) => {
    // If the current error msg is the same, don't bother updating the errorMsg
    if (currentErrMsgMap[errorActionType] === errorMsg) {
        return;
    }

    const currentDebounceSetErr = debouncingSetErrorList[errorActionType];
    // Cancel a debonce in progress for no weird behavior
    if (currentDebounceSetErr) {
        currentDebounceSetErr.cancel();
    }
    const debouncedSetError = debounce(() => {
        dispatch({ type: errorActionType, payload: errorMsg });
        // Since the set error has now run you can remove it from the debounce
        delete debouncingSetErrorList[errorActionType];
        // Update the previous error msg map
        if (errorMsg) {
            currentErrMsgMap[errorActionType] = errorMsg;
        } else {
            delete currentErrMsgMap[errorActionType];
        }
    }, 600);
    debouncedSetError();
    // Store the debounc func that is currently now running
    debouncingSetErrorList[errorActionType] = debouncedSetError;
};

export const validationMiddlware = ({ dispatch }) => {
    return (next) => {
        return (action) => {
            if (
                action.payload &&
                action.payload.validationConfig &&
                action.payload.errorActionType
            ) {
                const errorActionType = action.payload.errorActionType;
                const validationConfig = action.payload.validationConfig;
                const value = action.payload.value;
                const errorMsg = validate(value, validationConfig);
                setErrorDebounced(dispatch, errorActionType, errorMsg);
            }
            next(action);
        };
    };
};
