import { NavigationState } from 'react-native';
import { Action } from 'redux';
import { createSelector } from 'reselect';

import BoletoListNavigator from '../navigators/BoletoListNavigator';
import { AppStore } from '../stores/index';

export const getNavigationState = createSelector((state: AppStore) => {
    return state.navigation;
}, (navigation) => navigation);

const initialState = BoletoListNavigator.router.getStateForAction(
    BoletoListNavigator.router.getActionForPathAndParams('BoletoList'),
    null,
);

function navigationReducer(
    state: NavigationState = initialState,
    action: Action,
): any {
    const nextState = BoletoListNavigator.router.getStateForAction(
        action,
        state,
    );

    return nextState || state;
}

export default navigationReducer;
