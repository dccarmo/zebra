import { createSelector } from "reselect";

import BoletoStore from "../stores/BoletoStore";

class BoletoSelector {
    static getPendingBoletos = createSelector(
        [(state: BoletoStore) => (state.boletos)],
        (boletos) => {
            return boletos.filter((boleto) => (!boleto.paid));
        },
    );

    static getBoleto = createSelector(
        [(state: BoletoStore, barcode: string) => (
            state.boletos.find((boleto) => boleto.barcode === barcode)
        )],
        (boleto) => (boleto),
    );
}

export default BoletoSelector;
