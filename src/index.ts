// import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "./reducers";
import BoletoListScreen from "./screens/BoletoListScreen";
import BoletoReaderScreen from "./screens/BoletoReaderScreen";
import AppStore from "./stores/AppStore";

const store = createStore(reducers, {
  boletos: [
      {
        data: "",
      },
      {
        data: "",
      },
    ],
} as AppStore);

export const startApp = () => {
  Navigation.registerComponent("zebra.BoletoListScreen", () => BoletoListScreen, store, Provider);
  Navigation.registerComponent("zebra.BoletoReaderScreen", () => BoletoReaderScreen, store, Provider);

  Navigation.startTabBasedApp({
    tabs: [
      {
        icon: require("../imgs/boleto_tab_icon.png"),
        label: "Boletos",
        screen: "zebra.BoletoListScreen",
        title: "Boletos",
      },
    ],
  });
};
