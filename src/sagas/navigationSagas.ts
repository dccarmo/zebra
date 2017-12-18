import { InteractionManager } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { delay, END, eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import {
    addBoletoAction,
    deleteBoletoAction,
    requestDeleteBoletoAction,
    selectBarcodeAction,
} from '../actions/index';

function runAfterNavigation() {
    return eventChannel((emitter) => {
        InteractionManager.runAfterInteractions(() => {
            emitter(END);
        });
        return () => null;
    });
}

export function* addedBoletoSaga(action: Action) {
    if (isType(action, addBoletoAction)) {
        yield put(NavigationActions.back());
        yield call(delay, 500);
        const channel = yield call(runAfterNavigation);

        try {
            yield take(channel);
        } finally {
            yield put(selectBarcodeAction(action.payload.barcode));
        }
    }
}

export function* watchAddedBoleto() {
    yield takeEvery(addBoletoAction, addedBoletoSaga);
}

export function* requestedDeleteBoletoSaga(action: Action) {
    if (isType(action, requestDeleteBoletoAction)) {
        yield put(NavigationActions.back());
        const channel = yield call(runAfterNavigation);

        try {
            yield take(channel);
        } finally {
            yield put(deleteBoletoAction(action.payload));
        }
    }
}

export function* watchRequestedDeleteBoleto() {
    yield takeEvery(requestDeleteBoletoAction, requestedDeleteBoletoSaga);
}

export function* selectedBoletoSaga() {
    yield put(NavigationActions.navigate({ routeName: 'BoletoDetail' }));
}

export function* watchSelectedBoleto() {
    yield takeEvery(selectBarcodeAction, selectedBoletoSaga);
}

export default function* navigationSagas() {
    yield all([
        watchAddedBoleto(),
        watchRequestedDeleteBoleto(),
        watchSelectedBoleto(),
    ]);
}
