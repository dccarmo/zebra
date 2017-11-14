import { all, call, put, select, takeEvery } from "redux-saga/effects";

import { StartWebServerAction, StopWebServerAction, UpdateWebServerInfoAction } from "../actions";
import Boleto from "../models/Boleto";
import { WebServerStatus } from "../models/WebServerInfo";
import BoletoSelector from "../selectors/BoletoSelector";
import AppStore from "../stores/AppStore";
import { webServer } from "../utilities/WebServer";

function* startWebServer() {
    const boleto: Boleto = yield select((state: AppStore) => (
        BoletoSelector.getBoleto(state.boletos, state.selectedBarcode!)
    ));

    yield put(UpdateWebServerInfoAction({
        error: null,
        status: WebServerStatus.Starting,
        url: null,
    }));

    try {
        const url = yield call(webServer.start);

        yield call(webServer.serveBoleto, boleto);

        yield put(UpdateWebServerInfoAction({
            error: null,
            status: WebServerStatus.Online,
            url,
        }));
    } catch (error) {
        yield put(UpdateWebServerInfoAction({
            error,
            status: WebServerStatus.Error,
            url: null,
        }));
    }
}

function* StartWebServerSaga() {
    yield takeEvery(StartWebServerAction, startWebServer);
}

function* stopWebServer() {
    yield call(webServer.stop);

    yield put(UpdateWebServerInfoAction({
        error: null,
        status: WebServerStatus.Offline,
        url: null,
    }));
}

function* StopWebServerSaga() {
    yield takeEvery(StopWebServerAction, stopWebServer);
}

export default function* sagas() {
    yield all([
        StartWebServerSaga(),
        StopWebServerSaga(),
    ]);
}
