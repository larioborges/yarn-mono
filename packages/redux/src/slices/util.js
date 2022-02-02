import { PROMISE_STATUS } from '../constants';

// Create form field (with error) actions
export const formSetPrefix = (reducerKey) => `${reducerKey}/set/form/`;
export const formSetActionType = (reducerKey, fieldName) =>
    `${formSetPrefix(reducerKey)}${fieldName}`;
export const formErrorPrefix = (reducerKey) => `${reducerKey}/set/error/`;
export const formErrorActionType = (reducerKey, fieldName) =>
    `${formErrorPrefix(reducerKey)}${fieldName}`;

// Form matchers
export const matchFormSetAction = (reducerName) => (action) =>
    action.type.startsWith(formSetPrefix(reducerName));
export const matchReducerAction = (reducerName) => (action) =>
    action.type.startsWith(`${reducerName}/`);

// Form submit helper methods
export const SUBMIT_STATE_FIELDS = ['submitStatus', 'submitError'];
export const resetSubmitError = () => {
    return (state) => {
        state.submitError = '';
    };
};
export const handleFormSubmit = {
    pendingState: (state) => ({
        ...state,
        submitStatus: PROMISE_STATUS.PENDING,
        submitError: '',
    }),
    fulfilledState: (state) => ({
        ...state,
        submitStatus: PROMISE_STATUS.SUCCESS,
    }),
    rejectedState: (state, submitError) => ({
        ...state,
        submitStatus: PROMISE_STATUS.ERROR,
        submitError: submitError,
    }),
};

// Track now (as last updated time) for a given reducer (for persist expiry)
export const setLastUpdated = () => {
    return (state) => {
        state.lastUpdated = Date.now();
    };
};

// Initial state builder
export const initState = (stateConfig) => {
    const state = !stateConfig ? {} : stateConfig;
    const withLastUpdated = () => {
        state.lastUpdated = null;
        return returnObj;
    };
    const withFormSubmit = () => {
        state.submitStatus = PROMISE_STATUS.INIT;
        state.submitError = '';
        return returnObj;
    };

    const getState = () => state;

    const returnObj = {
        withLastUpdated,
        withFormSubmit,
        getState,
    };

    return returnObj;
};
