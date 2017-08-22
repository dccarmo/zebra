export enum ServerStatus {
    Online,
    Offline,
}

export const initialWebServerStore: WebServerStore = {
    serverStatus: ServerStatus.Offline,
};

interface WebServerStore {
    serverStatus: ServerStatus;
}

export default WebServerStore;
