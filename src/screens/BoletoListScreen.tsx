import React from "react";
import { Platform, View } from "react-native";

import AddBoletoButton from "../components/AddBoletoButton";
import BoletoListSwitcher from "../components/BoletoListSwitcher";
import { colors } from "../constants";

class BoletoListScreen extends React.Component {
  static navigatorStyle = {
    navBarBackgroundColor: colors.monza,
    navBarButtonColor: colors.white,
    navBarNoBorder: true,
    navBarTextColor: colors.white,
    statusBarColor: colors.burgundy,
    topBarElevationShadowEnabled: false,
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
          <BoletoListSwitcher />
          { Platform.OS === "android" &&
            <AddBoletoButton
              onPress={this.navigateToBoletoReader.bind(this)}
          />
          }
      </View>
    );
  }
}

export default BoletoListScreen;
