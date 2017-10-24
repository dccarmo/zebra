import Boleto from "../models/Boleto";

interface BoletoStore {
    boletos: Boleto[];
    selectedBarcode: string|null;
}

export default BoletoStore;
