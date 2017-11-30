import { includes } from "lodash";
import { Action, combineReducers, Reducer } from "redux";
import { isType } from "typescript-fsa";

import { addBoletoAction, updateBoletoTitleAction, toggleBoletoPaidAction } from "../actions";
import Boleto from "../models/Boleto";
import { BoletoStore } from "../stores";

let initialStateByBarcode: { [_: string]: Boleto } = {};
let initialStateAllBarcodes: string[] = [];

if (__DEV__) {
    initialStateByBarcode = {
        "02191618900000166510010847800017732009402163": {
            barcode: "02191618900000166510010847800017732009402163",
            paid: true,
            title: null,
        },
        "24891735200000300000010847800017732009402163": {
            barcode: "24891735200000300000010847800017732009402163",
            paid: false,
            title: null,
        },
        "24891735600000300000010847800017732009402163": {
            barcode: "24891735600000300000010847800017732009402163",
            paid: false,
            title: "Creche",
        },
        "24991735300000300000010847800017732009402163": {
            barcode: "24891735300000300000010847800017732009402163",
            paid: false,
            title: null,
        },
        "39991611800001264300010847800017732009402163": {
            barcode: "39991611800001264300010847800017732009402163",
            paid: true,
            title: null,
        },
        "49491739000001734510010847800017732009402163": {
            barcode: "49491739000001734510010847800017732009402163",
            paid: false,
            title: null,
        },
        "75291735500345700000010847800017732009402163": {
            barcode: "75291735500345700000010847800017732009402163",
            paid: false,
            title: null,
        },
        "83680000004560000820999989421070019693993499": {
            barcode: "83680000004560000820999989421070019693993499",
            paid: false,
            title: null,
        },
        "85680000001200000820999989421070019693993499": {
            barcode: "85680000001200000820999989421070019693993499",
            paid: false,
            title: null,
        },
    };

    initialStateAllBarcodes = [
        "02191618900000166510010847800017732009402163",
        "24891735200000300000010847800017732009402163",
        "24891735600000300000010847800017732009402163",
        "24991735300000300000010847800017732009402163",
        "39991611800001264300010847800017732009402163",
        "49491739000001734510010847800017732009402163",
        "75291735500345700000010847800017732009402163",
        "83680000004560000820999989421070019693993499",
        "85680000001200000820999989421070019693993499",
    ];
}

function byBarcode(
    state: { [_: string]: Boleto } = initialStateByBarcode,
    action: Action,
): { [_: string]: Boleto } {
    if (isType(action, addBoletoAction)) {
        if (state.hasOwnProperty(action.payload.barcode)) {
            return state;
        }

        return {
            ...state,
            [action.payload.barcode]: action.payload,
        };
    }

    if (isType(action, updateBoletoTitleAction)) {
        const boleto = state[action.payload.barcode];

        return {
            ...state,
            [action.payload.barcode]: {
                ...boleto,
                title: action.payload.title,
            },
        };
    }

    if (isType(action, toggleBoletoPaidAction)) {
        const boleto = state[action.payload.barcode];

        return {
            ...state,
            [action.payload.barcode]: {
                ...boleto,
                paid: !boleto.paid,
            },
        };
    }

    return state;
}

function allBarcodes(
    state: string[] = initialStateAllBarcodes,
    action: Action,
): string[] {
    if (isType(action, addBoletoAction)) {
        if (includes(state, action.payload.barcode)) {
            return state;
        }

        const newState = [...state, action.payload.barcode];

        return Array.from(new Set(newState));
    }

    return state;
}

const barcodeReducer: Reducer<BoletoStore> = combineReducers({
    allBarcodes,
    byBarcode,
});

export default barcodeReducer;
