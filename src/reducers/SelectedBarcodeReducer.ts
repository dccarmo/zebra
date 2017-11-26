import { Action } from "redux";
import { isType } from "typescript-fsa";

import { deselectBarcodeAction, selectBarcodeAction } from "../actions";

function selectedBarcodeReducer(selectedBarCode: string|null = null, action: Action): string|null {
    if (isType(action, selectBarcodeAction)) {
        return action.payload;
    }

    if (isType(action, deselectBarcodeAction)) {
        return null;
    }

    return selectedBarCode;
}

export default selectedBarcodeReducer;
