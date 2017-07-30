import { createSelector } from "reselect";

import AppStore from "../stores/AppStore";

const getBoletos = (state: AppStore) => (state.boletos);

export const getPendingBoletos = createSelector(
    [getBoletos],
    (boletos) => {
        return boletos.filter((boleto) => (!boleto.paid));
    },
);
