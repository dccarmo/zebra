import { combineReducers } from "redux";

import boletosReducer from "./boletosReducer";
import navReducer from "./navReducer";
import selectedBarcodeReducer from "./selectedBarcodeReducer";
import webServerInfoReducer from "./webServerInfoReducer";

const reducers = combineReducers({
    boletos: boletosReducer,
    nav: navReducer,
    selectedBarcode: selectedBarcodeReducer,
    webServerInfo: webServerInfoReducer,
});

export default reducers;
