import { createAction } from '@reduxjs/toolkit';
import { formErrorActionType, formSetActionType } from '../slices/util';

const actionWithValidation = (action, errorActionType, validationConfig = {}) => {
    return createAction(action, (value) => {
        return {
            payload: {
                value,
                validationConfig,
                errorActionType,
            },
        };
    });
};

export const validationActions = (reducerName, fieldName, validationConfig = {}) => {
    const setErrorActionType = formErrorActionType(reducerName, fieldName);
    const setError = createAction(setErrorActionType);
    const setValue = actionWithValidation(
        formSetActionType(reducerName, fieldName),
        setErrorActionType,
        validationConfig,
    );

    return {
        setError,
        setValue,
    };
};
