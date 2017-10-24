import React from "react";
import { ScrollView } from "react-native";

import { maroonHeaderStyle } from "../../constants";
import SelectedBoletoDetail from "./SelectedBoletoDetail";
import WebServerInfo from "./WebServerInfo";

export enum WebServerStatus {
    Online,
    Offline,
}

class BoletoDetail extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <WebServerInfo />
                <SelectedBoletoDetail />
            </ScrollView>
        );
    }
}

export default BoletoDetail;
