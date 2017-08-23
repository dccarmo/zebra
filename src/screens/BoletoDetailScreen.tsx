import React from "react";
import { Platform, ScrollView } from "react-native";

import { colors } from "../constants";
import WebServerPanelContainer from "../containers/WebServerPanelContainer";

const navigatorButtonIds = {
  editBoletoButton: "editBoletoButton",
};

class BoletoDetailScreen extends React.Component {
  static navigatorStyle = {
    navBarBackgroundColor: colors.monza,
    navBarButtonColor: colors.white,
    navBarNoBorder: true,
    navBarTextColor: colors.white,
    statusBarColor: colors.burgundy,
    topBarElevationShadowEnabled: false,
  };

  static navigatorButtons = BoletoDetailScreen.getNavigatorButtons();

  static getNavigatorButtons() {
    let icon: string;

    if (Platform.OS === "android") {
        icon = require("../../imgs/navigation_add_icon.png");
    } else {
        icon = require("../../imgs/navigation_add_icon.png");
    }

    return {
      rightButtons: [
        {
          icon,
          id: navigatorButtonIds.editBoletoButton,
        },
      ],
    };
  }

  constructor(props: any) {
    super(props);

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

//   navigateToBoletoReader() {
//     (this.props as any).navigator.showModal({
//       navigatorStyle: {
//         navBarHidden: true,
//       },
//       screen: "zebra.BoletoReaderScreen",
//     });
//   }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
              <WebServerPanelContainer />
            </ScrollView>
        );
    }

    private onNavigatorEvent(event: any) {
    if (event.type === "NavBarButtonPress") {
      if (event.id === navigatorButtonIds.editBoletoButton) {
        // this.navigateToBoletoReader();
      }
    }
  }
}

export default BoletoDetailScreen;
