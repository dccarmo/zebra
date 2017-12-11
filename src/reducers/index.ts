import { combineReducers, Reducer } from 'redux';

import { AppStore } from '../stores';
import boletosReducer from './boletosReducer';
import navReducer from './navReducer';
import selectedBarcodeReducer from './selectedBarcodeReducer';
import webServerInfoReducer from './webServerInfoReducer';

const reducers: Reducer<AppStore> = combineReducers({
    boletos: boletosReducer,
    navigation: navReducer,
    selectedBarcode: selectedBarcodeReducer,
    webServerInfo: webServerInfoReducer,
});

export default reducers;
