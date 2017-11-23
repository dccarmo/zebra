import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants";

interface SectionHeaderProps {
    title: string;
}

const SectionHeader: React.SFC<SectionHeaderProps> = (props) =>  (
    <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    title: {
        color: colors.monza,
        fontWeight: (Platform.OS === "android") ? "400" : "500",
    },
});

export default SectionHeader;
