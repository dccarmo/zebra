import { Action } from "redux";
import { isType } from "typescript-fsa";

import { UpdateWebServerInfoAction } from "../actions";
import WebServerInfo, { WebServerStatus } from "../models/WebServerInfo";

const initialWebServerInfo: WebServerInfo = {
    error: null,
    status: WebServerStatus.Offline,
    url: null,
};

function WebServerReducer(webServerInfo: WebServerInfo = initialWebServerInfo, action: Action): WebServerInfo {
    if (isType(action, UpdateWebServerInfoAction)) {
        return action.payload;
    }

    return webServerInfo;
}

export default WebServerReducer;
