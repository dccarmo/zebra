import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Card from "../../components/Card";
import { colors } from "../../constants";

// export interface WebServerInfoProps {
//     status: WebServerStatus;
// }

const WebServerInfo: React.SFC = () => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.emerald}>
                <View style={styles.content}>
                    <Text style={styles.statusDetail}>Online</Text>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    content: {
        padding: 16,
    },
    statusDetail: {
        color: colors.white,
        textAlign: "center",
    },
});

export default WebServerInfo;
