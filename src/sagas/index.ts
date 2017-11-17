import { all, call, put, select, takeEvery } from "redux-saga/effects";

import { StartWebServerAction, StopWebServerAction, UpdateWebServerInfoAction } from "../actions";
import Boleto from "../models/Boleto";
import { WebServerStatus } from "../models/WebServerInfo";
import { getSelectedBoleto } from "../selectors";
import { webServer } from "../utilities/WebServer";

export function* startWebServer() {
    const boleto: Boleto = yield select(getSelectedBoleto);

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
            error: (error as Error).message,
            status: WebServerStatus.Error,
            url: null,
        }));
    }
}

export function* startWebServerWatcher() {
    yield takeEvery(StartWebServerAction, startWebServer);
}

export function* stopWebServer() {
    yield call(webServer.stop);

    yield put(UpdateWebServerInfoAction({
        error: null,
        status: WebServerStatus.Offline,
        url: null,
    }));
}

export function* stopWebServerWatcher() {
    yield takeEvery(StopWebServerAction, stopWebServer);
}

export default function* sagas() {
    yield all([
        startWebServerWatcher(),
        stopWebServerWatcher(),
    ]);
}
