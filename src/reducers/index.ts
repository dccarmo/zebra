import { combineReducers } from "redux";
import { Action } from "redux";
import { isType } from "typescript-fsa";

import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";

const reducers = combineReducers({
    boletos: boletoReducer,
});

export default reducers;

function boletoReducer(state: Boleto[] = [], action: Action): Boleto[] {
    if (isType(action, AddBoletoAction)) {
        return [...state, { data: action.payload.data }];
    }

    return state;
}
