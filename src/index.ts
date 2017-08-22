// import React from "react";
import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { colors } from "./constants";
import { screens } from "./constants/screens";
import reducers from "./reducers";
import BoletoDetailScreen from "./screens/BoletoDetailScreen";
import BoletoListScreen from "./screens/BoletoListScreen";
import BoletoReaderScreen from "./screens/BoletoReaderScreen";
import { initialAppStore } from "./stores/AppStore";

const store = createStore(reducers, initialAppStore);

export const startApp = () => {
  Navigation.registerComponent(screens.BoletoListScreen, () => BoletoListScreen, store, Provider);
  Navigation.registerComponent(screens.BoletoReaderScreen, () => BoletoReaderScreen, store, Provider);
  Navigation.registerComponent(screens.BoletoDetailScreen, () => BoletoDetailScreen, store, Provider);

  if (Platform.OS === "android") {
    Navigation.startSingleScreenApp({
      drawer: {
        disableOpenGesture: false,
        left: {
          screen: screens.BoletoListScreen,
        },
      },
      screen: {
        screen: screens.BoletoListScreen,
        title: "Boletos",
      },
    });
  } else {
    Navigation.startTabBasedApp({
    tabs: [
      {
        icon: require("../imgs/boleto_tab_icon.png"),
        label: "Boletos",
        screen: screens.BoletoListScreen,
        title: "Boletos",
      },
      {
        icon: require("../imgs/boleto_tab_icon.png"),
        label: "Opções",
        screen: screens.BoletoListScreen,
        title: "Opções",
      },
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: colors.monza,
    },
  });
  }
};
