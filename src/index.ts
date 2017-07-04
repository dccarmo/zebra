// import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "./reducers";
import BoletoListScreen from "./screens/BoletoListScreen";
import AppStore from "./stores/AppStore";

const store = createStore(reducers, {
  data: {
    boletos: [
      {
        number: ""
      }
    ]
  }
} as AppStore);

export const startApp = () => {
  Navigation.registerComponent("zebra.BoletoListScreen", () => BoletoListScreen, store, Provider);

  Navigation.startTabBasedApp({
    tabs: [
      {
        icon: require("../imgs/boleto_tab_icon.png"),
        label: "Boletos",
        screen: "zebra.BoletoListScreen",
        title: "Boletos"
      }
    ]
  });
};
