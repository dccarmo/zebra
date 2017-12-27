import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { updateWebServerInfoAction } from '../actions';
import WebServerInfo, { WebServerStatus } from '../models/WebServerInfo';

const initialWebServerInfo: WebServerInfo = {
    error: null,
    status: WebServerStatus.Offline,
    url: null,
};

function webServerInfoReducer(
    state: WebServerInfo = initialWebServerInfo,
    action: Action,
): WebServerInfo {
    if (isType(action, updateWebServerInfoAction)) {
        return action.payload;
    }

    return state;
}

export default webServerInfoReducer;
