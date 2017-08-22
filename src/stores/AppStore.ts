import BoletoStore, { initialBoletoStore } from "./BoletoStore";
import WebServerStore, { initialWebServerStore } from "./WebServerStore";

export const initialAppStore: AppStore = {
    boletoStore: initialBoletoStore,
    webServerStore: initialWebServerStore,
};

interface AppStore {
    boletoStore: BoletoStore;
    webServerStore: WebServerStore;
}

export default AppStore;
