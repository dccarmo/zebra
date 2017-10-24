import { connect } from "react-redux";

import { getTitle } from "../../models/Boleto";
import BoletoSelector from "../../selectors/BoletoSelector";
import AppStore from "../../stores/AppStore";
import Detail, { DetailProps } from "./Detail";

const SelectedBoletoDetail = connect(
    (state: AppStore): DetailProps => {
        const boleto = BoletoSelector.getBoleto(state.boletoStore, state.boletoStore.selectedBarcode!);
        let title = "Desconhecido";

        if (boleto) {
            title = getTitle(boleto) ? getTitle(boleto)! : title;
        }

        return {
            title,
        };
    },
)(Detail);

export default SelectedBoletoDetail;
