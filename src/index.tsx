import React from "react";
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

export default class Zebra extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BoletoListScreen />
      </Provider>
    );
  }
}
