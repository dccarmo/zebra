import { createSelector } from "reselect";

import AppStore from "../stores/AppStore";

export const getPendingBoletos = createSelector(
    (state: AppStore) => (
        state.boletos.filter((boleto) => (!boleto.paid))
    ),
    (boletos) => (boletos),
);

export const getSelectedBoleto = createSelector(
    (state: AppStore) => (
        state.boletos.find((boleto) => (boleto.barcode === state.selectedBarcode))
    ),
    (boleto) => (boleto),
);
