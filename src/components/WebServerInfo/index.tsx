import React from "react";
import { Text, View } from "react-native";

import { colors } from "../../constants";
import { WebServerStatus } from "../../screens/BoletoDetailScreen";
import Card from "../Card";
import styles from "./styles";

export interface WebServerInfoProps {
    status: WebServerStatus;
}

const WebServerInfo: React.SFC<WebServerInfoProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.emerald}>
                <View style={styles.content}>
                    {props.status === WebServerStatus.Online ?
                    <Text style={styles.statusDetail}>Online</Text> :
                    <Text style={styles.statusDetail}>Offline</Text>}
                </View>
            </Card>
        </View>
    );
};

export default WebServerInfo;
