import React from 'react';
import { Provider } from 'react-redux';
import { setConfigApiBaseUrl } from '@lario/redux/src/slices/config';
import { PersistGate } from 'redux-persist/integration/react';
import { getRedux } from '@lario/redux';

const { store, persistor } = getRedux(process.env.GATSBY_REDUX_DEV);

export const wrapRootElement = ({ element }) => {
    store.dispatch(setConfigApiBaseUrl(process.env.GATSBY_API_BASE_URL));
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {element}
            </PersistGate>
        </Provider>
    );
}
