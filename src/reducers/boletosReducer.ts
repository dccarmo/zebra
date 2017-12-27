import { includes, values } from 'lodash';
import { Action } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { isType } from 'typescript-fsa';

import { createSelector } from 'reselect';
import {
    addBoletoAction,
    createReminderAction,
    deleteBoletoAction,
    deleteReminderAction,
    toggleBoletoPaidAction,
    updateBoletoTitleAction,
} from '../actions';
import Boleto from '../models/Boleto';
import { AppStore } from '../stores/index';

let initialStateByBarcode: { [_: string]: Boleto } = {};
let initialStateAllBarcodes: string[] = [];

if (__DEV__) {
    initialStateByBarcode = {
        '02191618900000166510010847800017732009402163': {
            barcode: '02191618900000166510010847800017732009402163',
            dateAdded: Date.now(),
            paid: true,
            reminderId: null,
            title: null,
        },
        '24891735200000300000010847800017732009402163': {
            barcode: '24891735200000300000010847800017732009402163',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: null,
        },
        '24891735600000300000010847800017732009402163': {
            barcode: '24891735600000300000010847800017732009402163',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: 'Creche',
        },
        '24991735300000300000010847800017732009402163': {
            barcode: '24891735300000300000010847800017732009402163',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: null,
        },
        '39991611800001264300010847800017732009402163': {
            barcode: '39991611800001264300010847800017732009402163',
            dateAdded: Date.now(),
            paid: true,
            reminderId: null,
            title: null,
        },
        '49491739000001734510010847800017732009402163': {
            barcode: '49491739000001734510010847800017732009402163',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: null,
        },
        '75291735500345700000010847800017732009402163': {
            barcode: '75291735500345700000010847800017732009402163',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: null,
        },
        '83680000004560000820999989421070019693993499': {
            barcode: '83680000004560000820999989421070019693993499',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: null,
        },
        '85680000001200000820999989421070019693993499': {
            barcode: '85680000001200000820999989421070019693993499',
            dateAdded: Date.now(),
            paid: false,
            reminderId: null,
            title: null,
        },
    };

    initialStateAllBarcodes = [
        '02191618900000166510010847800017732009402163',
        '24891735200000300000010847800017732009402163',
        '24891735600000300000010847800017732009402163',
        '24991735300000300000010847800017732009402163',
        '39991611800001264300010847800017732009402163',
        '49491739000001734510010847800017732009402163',
        '75291735500345700000010847800017732009402163',
        '83680000004560000820999989421070019693993499',
        '85680000001200000820999989421070019693993499',
    ];
}

export const getBoleto = createSelector((state: AppStore, barcode: string) => {
    return state.boletos.byBarcode[barcode];
}, (boleto) => boleto);

export const getBoletoForReminder = createSelector(
    (state: AppStore, reminderId: string) => {
        for (const boleto of values(state.boletos.byBarcode)) {
            if (boleto.reminderId === reminderId) {
                return boleto;
            }
        }

        return null;
    },
    (boleto) => boleto,
);

export const getPendingBoletos = createSelector(
    (state: AppStore) =>
        values(state.boletos.byBarcode).filter((boleto) => !boleto.paid),
    (boletos) => boletos,
);

export const getPaidBoletos = createSelector(
    (state: AppStore) =>
        values(state.boletos.byBarcode).filter((boleto) => boleto.paid),
    (boletos) => boletos,
);

export const getAllBoletos = createSelector(
    (state: AppStore) => values(state.boletos.byBarcode),
    (boletos) => boletos,
);

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
            [action.payload.barcode]: {
                barcode: action.payload.barcode,
                dateAdded: Date.now(),
                paid: false,
                reminderId: null,
                title: null,
            },
        };
    }

    if (isType(action, deleteBoletoAction)) {
        const { [action.payload.barcode]: _, ...newState } = state;

        return newState;
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

    if (isType(action, createReminderAction.done)) {
        const boleto = state[action.payload.params.barcode];

        return {
            ...state,
            [action.payload.params.barcode]: {
                ...boleto,
                reminderId: action.payload.result.id,
            },
        };
    }

    if (isType(action, deleteReminderAction.done)) {
        const boleto = state[action.payload.result.barcode];

        return {
            ...state,
            [action.payload.result.barcode]: {
                ...boleto,
                reminderId: null,
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

    if (isType(action, deleteBoletoAction)) {
        return state.filter((barcode) => barcode !== action.payload.barcode);
    }

    return state;
}

const config = {
    key: 'boletos',
    storage,
};

const boletosReducer = persistCombineReducers(config, {
    allBarcodes,
    byBarcode,
});

export default boletosReducer;
