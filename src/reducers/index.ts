import { combineReducers } from "redux";

import BoletoReducer from "./BoletoReducer";
import NavigationReducer from "./NavigationReducer";
import SelectedBarcodeReducer from "./SelectedBarcodeReducer";

const reducers = combineReducers({
    boletos: BoletoReducer.reducer,
    nav: NavigationReducer.reducer,
    selectedBarcode: SelectedBarcodeReducer.reducer,
});

export default reducers;
