import { ListView } from "react-native";
import { connect } from "react-redux";

import BoletoList, { BoletoListProps } from "../components/BoletoList";
import Boleto from "../models/Boleto";
import { getPendingBoletos } from "../selectors/boleto-selector";
import AppStore from "../stores/AppStore";

export interface BoletoListContainerProps {
    onSelectBoleto: (boleto: Boleto) => void;
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const BoletoListContainer = connect(
    (state: AppStore, ownProps: BoletoListContainerProps): BoletoListProps => {
        return {
            dataSource: dataSource.cloneWithRows(getPendingBoletos(state.boletoStore)),
            onSelectBoleto: ownProps.onSelectBoleto,
        };
    },
)(BoletoList);

export default BoletoListContainer;
