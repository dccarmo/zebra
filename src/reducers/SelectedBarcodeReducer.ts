import { Action } from "redux";
import { isType } from "typescript-fsa";

import { SelectBarcodeAction } from "../actions";

function selectedBarcodeReducer(selectedBarCode: string|null = null, action: Action): string|null {
    if (isType(action, SelectBarcodeAction)) {
        return action.payload;
    }

    return selectedBarCode;
}

export default selectedBarcodeReducer;
