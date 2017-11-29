import React from "react";
import { Platform, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { colors } from "./constants/index";
import BoletoListNavigatorContainer from "./containers/BoletoListNavigatorContainer";
import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

class App extends React.PureComponent {
    componentWillMount() {
        StatusBar.setBarStyle("light-content");

        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor(colors.burgundy);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <BoletoListNavigatorContainer />
            </Provider>
        );
    }
}

export default App;
