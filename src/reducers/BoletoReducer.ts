import { Action } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction } from "../actions";
import BoletoStore, { initialBoletoStore } from "../stores/BoletoStore";

class BoletoReducer {
    static reducer(state: BoletoStore = initialBoletoStore, action: Action): BoletoStore {
        if (isType(action, AddBoletoAction)) {
            if (!state.boletos.find((boleto) => boleto.barcode === action.payload.barcode)) {
                return {
                    ...state,
                    boletos: [...state.boletos, { ...action.payload }],
                };
            }
        }

        return state;
    }
}

export default BoletoReducer;
