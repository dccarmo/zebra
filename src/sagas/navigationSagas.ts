import { NavigationActions } from "react-navigation";
import { delay } from "redux-saga";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { Action } from "redux";
import { isType } from "typescript-fsa";
import { addBoletoAction, selectBarcodeAction } from "../actions/index";

export function* addedBoletoSaga(action: Action) {
    if (isType(action, addBoletoAction)) {
        yield put(NavigationActions.back());
        yield call(delay, 500);
        yield put(selectBarcodeAction(action.payload.barcode));
    }
}

export function* watchAddedBoleto() {
    yield takeEvery(addBoletoAction, addedBoletoSaga);
}

export function* selectedBoletoSaga() {
    yield put(NavigationActions.navigate({ routeName: "BoletoDetail" }));
}

export function* watchSelectedBoleto() {
    yield takeEvery(selectBarcodeAction, selectedBoletoSaga);
}

export default function* navigationSagas() {
    yield all([
        watchAddedBoleto(),
        watchSelectedBoleto(),
    ]);
}
