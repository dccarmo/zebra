import { connect } from "react-redux";

import BoletoDetail, { BoletoDetailProps } from "../components/BoletoDetail";
import { getBarcodeBank } from "../models/Boleto";
import BoletoSelector from "../selectors/BoletoSelector";
import AppStore from "../stores/AppStore";

export interface BoletoDetailContainerProps {
    barcode: string;
}

const BoletoDetailContainer = connect(
    (state: AppStore, ownProps: BoletoDetailContainerProps): BoletoDetailProps => {
        const boleto = BoletoSelector.getBoleto(state.boletoStore, ownProps.barcode);

        if (boleto) {
            return {
                bank: getBarcodeBank(boleto.barcode),
            };
        }

        return {
            bank: null,
        };
    },
)(BoletoDetail);

export default BoletoDetailContainer;
