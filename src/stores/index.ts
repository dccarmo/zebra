import { NavigationState } from "react-navigation";

import Boleto from "../models/Boleto";
import WebServerInfo from "../models/WebServerInfo";

export interface BoletoStore {
    allBarcodes: string[];
    byBarcode: {[_: string]: Boleto};
}

export interface AppStore {
    boletos: BoletoStore;
    nav: NavigationState;
    selectedBarcode: string|null;
    webServerInfo: WebServerInfo;
}
