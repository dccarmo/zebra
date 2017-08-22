import { createSelector } from "reselect";

import BoletoStore from "../stores/BoletoStore";

const getBoletos = (state: BoletoStore) => (state.boletos);

export const getPendingBoletos = createSelector(
    [getBoletos],
    (boletos) => {
        return boletos.filter((boleto) => (!boleto.paid));
    },
);
