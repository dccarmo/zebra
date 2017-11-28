import { Platform, StatusBar } from "react-native";
import { Action } from "redux";
import { all, call, select, takeEvery } from "redux-saga/effects";

import { colors } from "../constants/index";
import { getNavigationState } from "../selectors/index";
import { getCurrentRoute } from "../utilities/NavigationUtils";

export function* updateStatusBarSaga(platformOS: string, _: Action) {
    const navigationState = yield select(getNavigationState);
    const currentRoute = yield call(getCurrentRoute, navigationState);

    switch (currentRoute.routeName) {
        case "BarcodeReader":
            yield call(StatusBar.setHidden, true, "slide");
            break;

        default:
            yield call(StatusBar.setHidden, false, "slide");
            yield call(StatusBar.setBarStyle, "light-content");

            if (platformOS === "android") {
                yield call(StatusBar.setBackgroundColor, colors.burgundy);
            }
    }
}

export function* watchNavigationActions() {
    yield takeEvery(["Navigation/NAVIGATE", "Navigation/BACK"], updateStatusBarSaga, Platform.OS);
}

export default function* statusBarSagas() {
    yield all([
        watchNavigationActions(),
    ]);
}
