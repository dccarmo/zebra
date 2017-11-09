import Boleto from "../models/Boleto";

interface AppStore {
    boletos: Boleto[];
    selectedBarcode: string|null;
    nav: any;
}

export default AppStore;
