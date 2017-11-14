import { combineReducers } from "redux";

import BoletoReducer from "./BoletoReducer";
import NavigationReducer from "./NavigationReducer";
import SelectedBarcodeReducer from "./SelectedBarcodeReducer";
import WebServerReducer from "./WebServerReducer";

const reducers = combineReducers({
    boletos: BoletoReducer,
    nav: NavigationReducer,
    selectedBarcode: SelectedBarcodeReducer,
    webServerInfo: WebServerReducer,
});

export default reducers;
