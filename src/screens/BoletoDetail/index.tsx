import React from "react";
import { Platform, ScrollView, StatusBar } from "react-native";

import { colors } from "../../constants";
import { maroonHeaderStyle } from "../../constants";
import SelectedBoletoDetail from "./SelectedBoletoDetail";
import WebServerBanner from "./WebServerBanner";

class BoletoDetail extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
    };

    componentWillMount() {
        StatusBar.setHidden(false, "slide");
        StatusBar.setBarStyle("light-content");

        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor(colors.burgundy);
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <WebServerBanner />
                <SelectedBoletoDetail />
            </ScrollView>
        );
    }
}

export default BoletoDetail;
