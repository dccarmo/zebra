import { StatusBar } from 'react-native';
import { all, call, select, takeEvery } from 'redux-saga/effects';

import { getNavigationState } from '../reducers/navigationReducer';
import { getCurrentRoute } from '../utilities/NavigationUtils';

export function* updateStatusBarSaga() {
    const navigationState = yield select(getNavigationState);
    const currentRoute = yield call(getCurrentRoute, navigationState);

    switch (currentRoute.routeName) {
        case 'BarcodeReader':
            yield call(StatusBar.setHidden, true, 'slide');
            break;

        default:
            yield call(StatusBar.setHidden, false, 'slide');
    }
}

export function* watchNavigationActions() {
    yield takeEvery(
        ['Navigation/BACK', 'Navigation/NAVIGATE'],
        updateStatusBarSaga,
    );
}

export default function* statusBarSagas() {
    yield all([watchNavigationActions()]);
}
