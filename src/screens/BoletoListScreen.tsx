import React from "react";
import { Platform, View } from "react-native";

import AddBoletoButton from "../components/AddBoletoButton";
import { colors } from "../constants";
import BoletoListContainer from "../containers/BoletoListContainer";

class BoletoListScreen extends React.Component {
  static navigatorStyle = {
    navBarBackgroundColor: colors.monza,
    navBarButtonColor: colors.white,
    navBarTextColor: colors.white,
    statusBarColor: colors.burgundy,
  };

  static navigatorButtons = BoletoListScreen.getNavigatorButtons();

  static getNavigatorButtons() {
    if (Platform.OS === "android") {
      return {
        leftButtons: [
          {
            icon: require("../../imgs/drawer_icon.png"),
            id: "addBoletoButton",
          },
        ],
      };
    }

    return {
      rightButtons: [
        {
          icon: require("../../imgs/navigation_add_icon.png"),
          id: "addBoletoButton",
        },
      ],
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
        navBarHidden: true,
      },
      screen: "zebra.BoletoReaderScreen",
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
