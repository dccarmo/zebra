import { InteractionManager } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { END, eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import {
    addBoletoAction,
    deleteBoletoAction,
    requestDeleteBoletoAction,
    selectBarcodeAction,
} from '../actions/index';

export function runAfterNavigationChannel() {
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
        const channel = yield call(runAfterNavigationChannel);

        try {
            yield take(channel);
        } finally {
            yield put(selectBarcodeAction({ barcode: action.payload.barcode }));
        }
    }
}

export function* watchAddedBoleto() {
    yield takeEvery(addBoletoAction, addedBoletoSaga);
}

export function* requestedDeleteBoletoSaga(action: Action) {
    if (isType(action, requestDeleteBoletoAction)) {
        yield put(NavigationActions.back());
        const channel = yield call(runAfterNavigationChannel);

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

export function* selectBoletoSaga(action: Action) {
    if (isType(action, selectBarcodeAction)) {
        yield put(
            NavigationActions.navigate({
                params: { barcode: action.payload.barcode },
                routeName: 'BoletoDetail',
            }),
        );
    }
}

export function* watchSelectedBoleto() {
    yield takeLatest(selectBarcodeAction, selectBoletoSaga);
}

export default function* navigationSagas() {
    yield all([
        watchAddedBoleto(),
        watchRequestedDeleteBoleto(),
        watchSelectedBoleto(),
    ]);
}
