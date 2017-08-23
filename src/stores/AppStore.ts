import BoletoStore, { populatedBoletoStore } from "./BoletoStore";
import WebServerStore, { initialWebServerStore } from "./WebServerStore";

export const initialAppStore: AppStore = {
    boletoStore: populatedBoletoStore,
    webServerStore: initialWebServerStore,
};

interface AppStore {
    boletoStore: BoletoStore;
    webServerStore: WebServerStore;
}

export default AppStore;
