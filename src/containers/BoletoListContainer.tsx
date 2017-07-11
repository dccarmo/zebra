import { ListView } from "react-native";
import { connect } from "react-redux";

import BoletoList, { BoletoListProps } from "../components/BoletoList";
import AppStore from "../stores/AppStore";

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const mapStateToProps = (state: AppStore): BoletoListProps => {
  return {
    dataSource: dataSource.cloneWithRows(state.boletos)
  };
};

const BoletoListContainer = connect(
  mapStateToProps
)(BoletoList);

export default BoletoListContainer;
