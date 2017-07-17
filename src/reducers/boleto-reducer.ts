import { Action } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";

export default function boletoReducer(state: Boleto[] = [], action: Action): Boleto[] {
    if (isType(action, AddBoletoAction)) {
        if (!state.find((boleto) => boleto.data === action.payload.data)) {
            return [...state, { data: action.payload.data }];
        }
    }

    return state;
}
