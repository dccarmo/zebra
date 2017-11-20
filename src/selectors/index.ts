import { values } from "lodash";
import { createSelector } from "reselect";

import { AppStore } from "../stores";

export const getPendingBoletos = createSelector(
    (state: AppStore) => (
        values(state.boletos.byBarcode).filter((boleto) => (!boleto.paid))
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
