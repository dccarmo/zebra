import _ from "lodash";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Camera from "react-native-camera";

export interface CameraOverlayProps {
    onBarcodeRead: (data: string) => void;
    onDismiss: () => void;
}

class CameraOverlay extends React.Component<CameraOverlayProps> {
    onBarcodeRead: (data: string) => void;

    constructor(props: CameraOverlayProps) {
        super(props);

        this.onBarcodeRead = _.once((data: string) => props.onBarcodeRead(data));
    }

    render() {
        return (
            <View style={styles.container}>
                 <Camera
                 style={styles.preview}
                 aspect={Camera.constants.Aspect.fill}
                 onBarcodeRead={this.onBarcodeRead}
                 keepAwake={true}
                />
                <Button
                onPress={this.props.onDismiss}
                title="Fechar"
                color="#841584"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    capture: {
        backgroundColor: "#fff",
        borderRadius: 5,
        color: "#000",
        flex: 0,
        margin: 40,
        padding: 10,
    },
    container: {
        alignItems: "stretch",
        flex: 1,
    },
    preview: {
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default CameraOverlay;
