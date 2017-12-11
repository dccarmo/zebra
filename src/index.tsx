import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import createSagaMiddleware from 'redux-saga';

import { colors } from './constants/index';
import BoletoListNavigatorContainer from './containers/BoletoListNavigatorContainer';
import reducers from './reducers';
import sagas from './sagas';
import { AppStore } from './stores/index';

class App extends React.PureComponent {
    store: Store<AppStore>;
    persistor: any;

    constructor() {
        super();

        const sagaMiddleware = createSagaMiddleware();

        this.store = createStore(reducers, applyMiddleware(sagaMiddleware));
        this.persistor = persistStore(this.store);

        sagaMiddleware.run(sagas);
    }

    componentWillMount() {
        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.burgundy);
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <PersistGate persistor={this.persistor}>
                    <BoletoListNavigatorContainer />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
