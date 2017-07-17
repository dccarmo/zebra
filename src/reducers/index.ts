import { combineReducers } from "redux";

import boletoReducer from "./boleto-reducer";

const reducers = combineReducers({
    boletos: boletoReducer,
});

export default reducers;
