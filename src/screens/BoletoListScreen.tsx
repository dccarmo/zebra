import React from "react";
import { Platform, View } from "react-native";

import AddBoletoButton from "../components/AddBoletoButton";
import BoletoListContainer from "../containers/BoletoListContainer";

class BoletoListScreen extends React.Component {
  static navigatorButtons = BoletoListScreen.getNavigatorButtons();

  static getNavigatorButtons() {
    if (Platform.OS === "android") {
      return {};
    }

    return {
      rightButtons: [
        {
          buttonFontSize: 24,
          id: "addBoletoButton",
          title: "+"
        }
      ]
    };
  }

  constructor(props) {
    super(props);

    (this.props as any).navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "addBoletoButton") {
        this.navigateToBoletoReader();
      }
    }
  }

  navigateToBoletoReader() {
    (this.props as any).navigator.showModal({
      navigatorStyle: {
        navBarHidden: true
      },
      screen: "zebra.BoletoReaderScreen"
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <BoletoListContainer />
        { Platform.OS === "android" &&
          <AddBoletoButton
            onPress={this.navigateToBoletoReader}
          />
        }
      </View>
    );
  }
}

export default BoletoListScreen;
