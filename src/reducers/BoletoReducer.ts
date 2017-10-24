import { Action } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction, SelectBarcodeAction } from "../actions";
import BoletoStore from "../stores/BoletoStore";

// const initialState: BoletoStore = {
//     boletos: [],
// };

const populatedState: BoletoStore = {
    boletos: [
        {
            barcode: "02191618900000166510010847800017732009402163",
            paid: false,
            title: null,
        },
        {
            barcode: "39991611800001264300010847800017732009402163",
            paid: false,
            title: null,
        },
        {
            barcode: "85680000001200000820999989421070019693993499",
            paid: false,
            title: null,
        },
    ],
    selectedBarcode: null,
};

class BoletoReducer {
    static reducer(state: BoletoStore = populatedState, action: Action): BoletoStore {
        if (isType(action, AddBoletoAction)) {
            if (!state.boletos.find((boleto) => boleto.barcode === action.payload.barcode)) {
                return {
                    ...state,
                    boletos: [...state.boletos, { ...action.payload }],
                };
            }
        }

        if (isType(action, SelectBarcodeAction)) {
            return {
                ...state,
                selectedBarcode: action.payload,
            };
        }

        return state;
    }
}

export default BoletoReducer;
