import React from "react";
import { Text, View } from "react-native";

import { colors } from "../../constants";
import { WebServerStatus } from "../../stores/WebServerStore";
import Card from "../Card";
import styles from "./styles";

export interface WebServerPanelProps {
    serverStatus: WebServerStatus;
}

const WebServerPanel: React.SFC<WebServerPanelProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.emerald}>
                <View style={styles.content}>
                    {props.serverStatus === WebServerStatus.Online ?
                    <Text style={styles.statusDetail}>Online</Text> :
                    <Text style={styles.statusDetail}>Offline</Text>}
                </View>
            </Card>
        </View>
    );
};

export default WebServerPanel;
