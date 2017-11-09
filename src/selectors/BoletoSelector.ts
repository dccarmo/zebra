import { createSelector } from "reselect";

import Boleto from "../models/Boleto";

class BoletoSelector {
    static getPendingBoletos = createSelector(
        [(boletos: Boleto[]) => (boletos)],
        (boletos) => {
            return boletos.filter((boleto) => (!boleto.paid));
        },
    );

    static getBoleto = createSelector(
        [(boletos: Boleto[], barcode: string) => (
            boletos.find((boleto) => (boleto.barcode === barcode))
        )],
        (boleto) => (boleto),
    );
}

export default BoletoSelector;
