import { Action } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";

// const initialState: BoletoStore = {
//     boletos: [],
// };

const populatedBoletos: Boleto[] = [
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
];

function BoletoReducer(boletos: Boleto[] = populatedBoletos, action: Action): Boleto[] {
    if (isType(action, AddBoletoAction)) {
        if (!boletos.find((boleto) => boleto.barcode === action.payload.barcode)) {
            return [
                ...boletos,
                { ...action.payload },
            ];
        }
    }

    return boletos;
}

export default BoletoReducer;
