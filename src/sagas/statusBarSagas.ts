import { Platform, StatusBar } from "react-native";
import { NavigationLeafRoute, NavigationState } from "react-navigation";
import { all, call, select, takeEvery } from "redux-saga/effects";

import { colors } from "../constants/index";
import { AppStore } from "../stores/index";

function getCurrentRoute(navigationState: NavigationState): NavigationLeafRoute<any> {
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
        return getCurrentRoute(route);
    }

    return route;
}

export function* updateStatusBarSaga() {
    const navigationState = yield select((state: AppStore) => state.nav);
    const currentRoute = yield call(getCurrentRoute, navigationState);

    switch (currentRoute.routeName) {
        case "BarcodeReader":
            yield call(StatusBar.setHidden, true, "slide");
            break;

        default:
            yield call(StatusBar.setHidden, false, "slide");
            yield call(StatusBar.setBarStyle, "light-content");

            if (Platform.OS === "android") {
                yield call(StatusBar.setBackgroundColor, colors.burgundy);
            }
    }
}

export function* watchNavigationActions() {
    yield takeEvery(["Navigation/NAVIGATE", "Navigation/BACK"], updateStatusBarSaga);
}

export default function* statusBarSagas() {
    yield all([
        watchNavigationActions(),
    ]);
}
