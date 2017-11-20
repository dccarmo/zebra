import { includes } from "lodash";
import { Action, combineReducers, Reducer } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";
import { BoletoStore } from "../stores/index";

const initialByBarcode: {[_: string]: Boleto} = {
    "02191618900000166510010847800017732009402163": {
        barcode: "02191618900000166510010847800017732009402163",
        paid: false,
        title: null,
    },
    "39991611800001264300010847800017732009402163": {
        barcode: "39991611800001264300010847800017732009402163",
        paid: false,
        title: null,
    },
    "85680000001200000820999989421070019693993499": {
        barcode: "85680000001200000820999989421070019693993499",
        paid: false,
        title: null,
    },
};

const initialAllBarcodes: string[] = [
    "02191618900000166510010847800017732009402163",
    "39991611800001264300010847800017732009402163",
    "85680000001200000820999989421070019693993499",
];

function byBarcode(state: {[_: string]: Boleto} = initialByBarcode, action: Action): {[_: string]: Boleto} {
    if (isType(action, AddBoletoAction)) {
        if (state.hasOwnProperty(action.payload.barcode)) {
            return state;
        }

        return {
            ...state,
            [action.payload.barcode]: action.payload,
        };
    }

    return state;
}

function allBarcodes(state: string[] = initialAllBarcodes, action: Action): string[] {
    if (isType(action, AddBoletoAction)) {
        if (includes(state, action.payload.barcode)) {
            return state;
        }

        const newState = [
            ...state,
            action.payload.barcode,
        ];

        return Array.from(new Set(newState));
    }

    return state;
}

const barcodeReducer: Reducer<BoletoStore> = combineReducers({
    allBarcodes,
    byBarcode,
});

export default barcodeReducer;
