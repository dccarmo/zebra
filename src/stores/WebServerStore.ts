export enum WebServerStatus {
    Online,
    Offline,
}

export const initialWebServerStore: WebServerStore = {
    serverStatus: WebServerStatus.Offline,
};

interface WebServerStore {
    serverStatus: WebServerStatus;
}

export default WebServerStore;
