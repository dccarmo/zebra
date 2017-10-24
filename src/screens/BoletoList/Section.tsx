import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants";

const Section: React.SFC = () =>  (
    <View style={styles.container}>
        <Text style={styles.title}>Próximos 7 dias</Text>
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

export default Section;
