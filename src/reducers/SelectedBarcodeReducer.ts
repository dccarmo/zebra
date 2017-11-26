import { Action } from "redux";
import { isType } from "typescript-fsa";

import { selectBarcodeAction } from "../actions";

function selectedBarcodeReducer(selectedBarCode: string|null = null, action: Action): string|null {
    if (isType(action, selectBarcodeAction)) {
        return action.payload;
    }

    return selectedBarCode;
}

export default selectedBarcodeReducer;
