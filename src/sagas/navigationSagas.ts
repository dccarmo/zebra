import { NavigationActions } from "react-navigation";
import { put, takeEvery } from "redux-saga/effects";

import { selectBarcodeAction } from "../actions/index";

export function* watchNavigateToBoletoDetail() {
    yield takeEvery(selectBarcodeAction, navigateToBoletoDetailSaga);
}

export function* navigateToBoletoDetailSaga() {
    yield put(NavigationActions.navigate({ routeName: "BoletoDetail" }));
}
