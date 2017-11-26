import { all } from "redux-saga/effects";

import { watchNavigateToBoletoDetail } from "./navigationSagas";
import { watchStartWebServer, watchStopWebServer } from "./webServerSagas";

export default function* sagas() {
    yield all([
        watchNavigateToBoletoDetail(),
        watchStartWebServer(),
        watchStopWebServer(),
    ]);
}
