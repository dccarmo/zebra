import { StyleSheet } from "react-native";

import { colors } from "../../constants";

const styles = StyleSheet.create({
    container: {
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
});

export default styles;
