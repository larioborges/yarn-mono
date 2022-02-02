import { REHYDRATE } from 'redux-persist';

const HALF_HOUR_SECONDS = 1800;

const isExpired = (lastUpdated, ttlSecs = HALF_HOUR_SECONDS) => {
    const timeLapsedSeconds = (Date.now() - lastUpdated) / 1000;

    if (timeLapsedSeconds > ttlSecs) {
        return true;
    }

    return false;
};

export const createExpireHandler = (reducerKey, resetAction, ttlSecs = HALF_HOUR_SECONDS) => {
    return (action, dispatch) => {
        if (action.key === reducerKey && action.type === REHYDRATE && action.payload) {
            if (isExpired(action.payload.lastUpdated, ttlSecs)) {
                dispatch(resetAction());
            }
        }
    };
};
