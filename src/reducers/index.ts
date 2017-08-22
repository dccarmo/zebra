import { combineReducers } from "redux";

import boletoReducer from "./boleto-reducer";
import webServerReducer from "./webserver-reducer";

const reducers = combineReducers({
    boletoStore: boletoReducer,
    webServerStore: webServerReducer,
});

export default reducers;
