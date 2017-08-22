import Boleto from "../models/Boleto";

export const initialBoletoStore: BoletoStore = {
    boletos: [],
};

export const populatedBoletoStore: BoletoStore = {
    boletos: [
        {
            barcode: "02191618900000166510010847800017732009402163",
            paid: false,
            title: null,
        },
        {
            barcode: "39991611800001264300010847800017732009402163",
            paid: false,
            title: null,
        },
        {
            barcode: "85680000001200000820999989421070019693993499",
            paid: false,
            title: null,
        },
    ],
};

interface BoletoStore {
    boletos: Boleto[];
}

export default BoletoStore;
