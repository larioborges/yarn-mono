import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';
import { validationMiddlware } from './validation/middleware';
import { expireMiddleware } from './expire/middleware';
import logger from 'redux-logger';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { rootReducer } from './slices';

const middleware = getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
})
    .concat(validationMiddlware)
    .concat(expireMiddleware);

export const getRedux = (isDev) => {
    const storeConfig = {
        reducer: rootReducer,
        middleware,
        devTools: false,
        enhancers: [reduxBatch],
    };

    if (isDev) {
        storeConfig.middleware = middleware.concat(logger);
        storeConfig.devTools = true;
    }

    const store = configureStore(storeConfig);

    return {
        store,
        persistor: persistStore(store),
    };
};
