import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    capture: {
        backgroundColor: "#fff",
        borderRadius: 5,
        color: "#000",
        flex: 0,
        margin: 40,
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: "row"
    },
    preview: {
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end"
    }
});

export default styles;
