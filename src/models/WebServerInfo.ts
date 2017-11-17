interface WebServerInfo {
    error: string|null;
    status: WebServerStatus;
    url: string|null;
}

export enum WebServerStatus {
    Error,
    Online,
    Offline,
    Starting,
}

export default WebServerInfo;
