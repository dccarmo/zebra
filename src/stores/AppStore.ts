import Boleto from "../models/Boleto";
import WebServerInfo from "../models/WebServerInfo";

interface AppStore {
    boletos: Boleto[];
    nav: any;
    selectedBarcode: string|null;
    webServerInfo: WebServerInfo;
}

export default AppStore;
