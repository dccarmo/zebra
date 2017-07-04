import { combineReducers } from "redux";

import { AddBoletoAction, OtherAction } from "../actions";
import { ADD_BOLETO } from "../constants";
import AppStore from "../stores/AppStore";

const reducers = combineReducers({
    data: boletoReducer,
});

export default reducers;

type BoletoAction = AddBoletoAction | OtherAction;

function boletoReducer(state: AppStore = {} as AppStore, action: BoletoAction = OtherAction) {
    switch (action.type) {
        case ADD_BOLETO:
            return state;

        default:
            return state;
    }
}
