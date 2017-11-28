import { all } from "redux-saga/effects";

import navigationSagas from "./navigationSagas";
import statusBarSagas from "./statusBarSagas";
import webServerSagas from "./webServerSagas";

export default function* sagas() {
    yield all([
        navigationSagas(),
        statusBarSagas(),
        webServerSagas(),
    ]);
}
