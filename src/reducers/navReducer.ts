import { Action } from "redux";

import BoletoListNavigator from "../navigators/BoletoListNavigator";

const initialState = BoletoListNavigator.router.getStateForAction(
    BoletoListNavigator.router.getActionForPathAndParams("BoletoList"),
    null,
);

function navReducer(state: any = initialState, action: Action): any {
    const nextState = BoletoListNavigator.router.getStateForAction(action, state);

    return nextState || state;
}

export default navReducer;
