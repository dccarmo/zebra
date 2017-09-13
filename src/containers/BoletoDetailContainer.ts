import { connect } from "react-redux";

import BoletoDetail, { BoletoDetailProps } from "../components/BoletoDetail";
import { getTitle } from "../models/Boleto";
import BoletoSelector from "../selectors/BoletoSelector";
import AppStore from "../stores/AppStore";

export interface BoletoDetailContainerProps {
    barcode: string;
}

const BoletoDetailContainer = connect(
    (state: AppStore, ownProps: BoletoDetailContainerProps): BoletoDetailProps => {
        const boleto = BoletoSelector.getBoleto(state.boletoStore, ownProps.barcode);
        let title = "Desconhecido";

        if (boleto) {
            title = getTitle(boleto) ? getTitle(boleto)! : title;
        }

        return {
            title,
        };
    },
)(BoletoDetail);

export default BoletoDetailContainer;
