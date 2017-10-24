import { combineReducers } from "redux";

import BoletoReducer from "./BoletoReducer";
import NavigationReducer from "./NavigationReducer";

const reducers = combineReducers({
    boletoStore: BoletoReducer.reducer,
    nav: NavigationReducer.reducer,
});

export default reducers;
