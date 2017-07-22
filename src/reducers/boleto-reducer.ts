import { Action } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";

export default function boletoReducer(state: Boleto[] = [], action: Action): Boleto[] {
    if (isType(action, AddBoletoAction)) {
        if (!state.find((boleto) => boleto.barCode === action.payload.barCode)) {
            return [...state, { barCode: action.payload.barCode }];
        }
    }

    return state;
}
