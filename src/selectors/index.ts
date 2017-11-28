import { values } from "lodash";
import { createSelector } from "reselect";

import { AppStore } from "../stores";

export const getNavigationState = createSelector(
    (state: AppStore) => {
        return state.navigation;
    },
    (navigation) => (navigation),
);

export const getBoleto = createSelector(
    (state: AppStore, barcode: string) => {
        return state.boletos.byBarcode[barcode];
    },
    (boleto) => (boleto),
);

export const getPendingBoletos = createSelector(
    (state: AppStore) => (
        values(state.boletos.byBarcode).filter((boleto) => (!boleto.paid))
    ),
    (boletos) => (boletos),
);

export const getPaidBoletos = createSelector(
    (state: AppStore) => (
        values(state.boletos.byBarcode).filter((boleto) => (boleto.paid))
    ),
    (boletos) => (boletos),
);

export const getAllBoletos = createSelector(
    (state: AppStore) => (
        values(state.boletos.byBarcode)
    ),
    (boletos) => (boletos),
);

export const getSelectedBoleto = createSelector(
    (state: AppStore) => {
        if (state.selectedBarcode) {
            return state.boletos.byBarcode[state.selectedBarcode];
        }

        return null;
    },
    (boleto) => (boleto),
);