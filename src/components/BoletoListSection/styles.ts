import { Platform, StyleSheet } from "react-native";

import { colors } from "../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    title: {
        color: colors.monza,
        fontWeight: (Platform.OS === "android") ? "400" : "500",
    },
});

export default styles;
