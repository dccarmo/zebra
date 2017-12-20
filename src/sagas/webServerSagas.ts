import { Action } from 'redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { isType } from 'typescript-fsa';

import {
    deselectBarcodeAction,
    selectBarcodeAction,
    updateWebServerInfoAction,
} from '../actions';
import Boleto from '../models/Boleto';
import { WebServerStatus } from '../models/WebServerInfo';
import { getBoleto } from '../reducers/boletosReducer';
import { webServer } from '../utilities/WebServer';

export function* startWebServerSaga(action: Action) {
    if (isType(action, selectBarcodeAction)) {
        const boleto: Boleto = yield select(getBoleto, action.payload.barcode);

        yield put(
            updateWebServerInfoAction({
                error: null,
                status: WebServerStatus.Starting,
                url: null,
            }),
        );

        try {
            const url = yield call(webServer.start);

            yield call(webServer.serveBoleto, boleto);

            yield put(
                updateWebServerInfoAction({
                    error: null,
                    status: WebServerStatus.Online,
                    url,
                }),
            );
        } catch (error) {
            yield put(
                updateWebServerInfoAction({
                    error: (error as Error).message,
                    status: WebServerStatus.Error,
                    url: null,
                }),
            );
        }
    }
}

export function* watchStartWebServer() {
    yield takeEvery(selectBarcodeAction, startWebServerSaga);
}

export function* stopWebServerSaga() {
    yield call(webServer.stop);

    yield put(
        updateWebServerInfoAction({
            error: null,
            status: WebServerStatus.Offline,
            url: null,
        }),
    );
}

export function* watchStopWebServer() {
    yield takeEvery(deselectBarcodeAction, stopWebServerSaga);
}

export default function* webServerSagas() {
    yield all([watchStartWebServer(), watchStopWebServer()]);
}
