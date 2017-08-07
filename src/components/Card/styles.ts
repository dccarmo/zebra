import { StyleSheet } from "react-native";

import { colors } from "../../constants";

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.09,
        shadowRadius: 6,
    },
});

export default styles;
