import { Action } from "redux";
// import { isType } from "typescript-fsa";

import WebServerStore, { initialWebServerStore } from "../stores/WebServerStore";

export default function webserverReducer(
    state: WebServerStore = initialWebServerStore,
    action: Action): WebServerStore {
    return state;
}
