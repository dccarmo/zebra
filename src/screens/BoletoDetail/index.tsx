import React from "react";
import { ScrollView } from "react-native";

import { maroonHeaderStyle } from "../../constants";
import SelectedBoletoDetail from "./SelectedBoletoDetail";
import WebServerBanner from "./WebServerBanner";

class BoletoDetail extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
    };

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
