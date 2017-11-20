import React from "react";
import { BackHandler, Platform } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { connect, Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import BoletoListNavigator from "./navigators/BoletoListNavigator";
import reducers from "./reducers";
import sagas from "./sagas";
import { AppStore } from "./stores";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(sagas);

class NavigatorWrapper extends React.Component<any> {
    componentDidMount() {
        if (Platform.OS === "android") {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;

        if (nav.index === 0) {
            return false;
        }

        dispatch(NavigationActions.back());

        return true;
    }

    render() {
        return (
            <BoletoListNavigator navigation={
                addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}
            />
        );
    }
}

const NavigatorContainer = connect(
    (state: AppStore): any => {
        return {
            nav: state.nav,
        };
    },
)(NavigatorWrapper);

const App: React.SFC = () => (
    <Provider store={store}>
        <NavigatorContainer />
    </Provider>
);

export default App;
