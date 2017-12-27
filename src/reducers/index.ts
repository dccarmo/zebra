import { combineReducers, Reducer } from 'redux';

import { AppStore } from '../stores';
import boletosReducer from './boletosReducer';
import navigationReducer from './navigationReducer';
import remindersReducer from './remindersReducer';
import webServerInfoReducer from './webServerInfoReducer';

const reducers: Reducer<AppStore> = combineReducers({
    boletos: boletosReducer,
    navigation: navigationReducer,
    reminders: remindersReducer,
    webServerInfo: webServerInfoReducer,
});

export default reducers;
