import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getRedux } from '@lario/redux';

const { store, persistor } = getRedux(process.env.GATSBY_REDUX_DEV);

export const wrapRootElement = ({ element }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {element}
            </PersistGate>
        </Provider>
    );
}
