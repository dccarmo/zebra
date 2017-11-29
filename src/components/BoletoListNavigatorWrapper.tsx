import React from "react";
import { BackHandler, Platform } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";

import BoletoListNavigator from "../navigators/BoletoListNavigator";

class BoletoListNavigatorWrapper extends React.Component<any> {
    componentDidMount() {
        if (Platform.OS === "android") {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                this.onBackPress,
            );
        }
    }

    onBackPress = () => {
        const { dispatch, navigation } = this.props;

        if (navigation.index === 0) {
            return false;
        }

        dispatch(NavigationActions.back());

        return true;
    }

    render() {
        return (
            <BoletoListNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation,
                })}
            />
        );
    }
}

export default BoletoListNavigatorWrapper;
