import React from "react";
import { Platform, View } from "react-native";

import AddBoletoButton from "../components/AddBoletoButton";
import BoletoListSwitcher from "../components/BoletoListSwitcher";
import { colors } from "../constants";

const navigatorButtonIds = {
  addBoletoButton: "addBoletoButton",
  toggleDrawerButton: "toggleDrawerButton",
};

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
            id: navigatorButtonIds.toggleDrawerButton,
          },
        ],
      };
    }

    return {
      rightButtons: [
        {
          icon: require("../../imgs/navigation_add_icon.png"),
          id: navigatorButtonIds.addBoletoButton,
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
      if (event.id === navigatorButtonIds.addBoletoButton) {
        this.navigateToBoletoReader();
      }

      if (event.id === navigatorButtonIds.toggleDrawerButton) {
        this.toggleDrawer();
      }
    }
  }

  toggleDrawer() {
    (this.props as any).navigator.toggleDrawer({
      animated: true,
      side: "left",
    });
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
