import BoletoStore, { populatedBoletoStore } from "./BoletoStore";

export const initialAppStore: AppStore = {
    boletoStore: populatedBoletoStore,
};

interface AppStore {
    boletoStore: BoletoStore;
}

export default AppStore;
