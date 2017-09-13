import { combineReducers } from "redux";

import BoletoReducer from "./BoletoReducer";

const reducers = combineReducers({
    boletoStore: BoletoReducer.reducer,
});

export default reducers;
