import React from "react";
import { SegmentedControlIOS, View } from "react-native";

import BoletoListContainer from "../../containers/BoletoListContainer";
import { customStyles } from "./styles";

interface BoletoListSwitcherState {
    selectedIndex: number;
}

class BoletoListSwitcher extends React.Component<any, BoletoListSwitcherState> {
  constructor() {
    super();

    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={customStyles.segmentedControlContainer}>
          <SegmentedControlIOS
          values={["Abertos", "Pagos", "Todos"]}
          selectedIndex={this.state.selectedIndex}
          tintColor={customStyles.segmentedControl.tintColor}
          />
        </View>
        <BoletoListContainer />
      </View>
    );
  }
}

export default BoletoListSwitcher;
