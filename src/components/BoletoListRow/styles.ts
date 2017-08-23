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
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        height: 74,
        padding: 16,
    },
    container: {
        marginHorizontal: 16,
        marginVertical: 10,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        height: 74,
        padding: 16,
    },
    dueDate: {
        color: colors.boulder,
        fontSize: 14,
    },
    infoContainer: {
        flex: 1,
    },
    infoContainerDouble: {
        justifyContent: "space-between",
    },
    infoContainerSingle: {
        justifyContent: "center",
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: (Platform.OS === "android") ? "400" : "500",
    },
});

export default styles;
