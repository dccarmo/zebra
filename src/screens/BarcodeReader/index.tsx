import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import CameraCloser from "./CameraCloser";
import CameraReader from "./CameraReader";

class BarcodeReader extends React.Component {
    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        StatusBar.setHidden(true, "slide");
    }

    render() {
        return (
            <CameraReader>
                <View style={styles.overlay}>
                    <View style={styles.leftStripe} />
                    <View style={styles.middleStripe} />
                    <View style={styles.rightStripe}>
                        <CameraCloser />
                    </View>
                </View>
            </CameraReader>
        );
    }
}

const styles = StyleSheet.create({
    leftStripe: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        flex: 1,
    },
    middleStripe: {
        flex: 2,
    },
    overlay: {
        flex: 1,
        flexDirection: "row",
    },
    rightStripe: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        flex: 1,
        paddingTop: 30,
    }
});

export default BarcodeReader;
