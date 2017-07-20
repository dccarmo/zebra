import { Platform, StyleSheet } from "react-native";

import { colors } from "../../constants";

const styles = StyleSheet.create({
    amount: {
        color: colors.boulder,
        fontSize: 20,
    },
    amountContainer: {
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center",
    },
    cell: {
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 4,
        flex: 1,
        flexDirection: "row",
        height: 74,
        paddingHorizontal: 16,
        paddingVertical: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.09,
        shadowRadius: 6,
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    dueDate: {
        color: colors.boulder,
        fontSize: 14,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: (Platform.OS === "android") ? "400" : "500",
    },
});

export default styles;
