import React from "react";
import { Platform, View } from "react-native";

import AddBoletoButton from "../components/AddBoletoButton";
import BoletoListSwitcher from "../components/BoletoListSwitcher";
import { colors, screens } from "../constants";
import Boleto from "../models/Boleto";

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

  constructor(props: any) {
    super(props);

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <BoletoListSwitcher onSelectBoleto={this.navigateToBoletoDetail.bind(this)} />
          { Platform.OS === "android" &&
            <AddBoletoButton
              onPress={this.navigateToBoletoReader.bind(this)}
          />
          }
      </View>
    );
  }

  private onNavigatorEvent(event: any) {
    if (event.type === "NavBarButtonPress") {
      if (event.id === navigatorButtonIds.addBoletoButton) {
        this.navigateToBoletoReader();
      }

      if (event.id === navigatorButtonIds.toggleDrawerButton) {
        this.toggleDrawer();
      }
    }
  }

  private toggleDrawer() {
    (this.props as any).navigator.toggleDrawer({
      animated: true,
      side: "left",
    });
  }

  private navigateToBoletoReader() {
    (this.props as any).navigator.showModal({
      navigatorStyle: {
        navBarHidden: true,
      },
      screen: screens.BoletoReaderScreen,
    });
  }

  private navigateToBoletoDetail(boleto: Boleto) {
    (this.props as any).navigator.push({
      passProps: boleto,
      screen: screens.BoletoDetailScreen,
      title: "Boleto",
    });
  }
}

export default BoletoListScreen;
