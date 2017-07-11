import _ from "lodash";
import React from "react";
import { View } from "react-native";
import Camera from "react-native-camera";

import styles from "./styles";

export interface BoletoReaderProps {
    onBarCodeRead: (data: string) => void;
}

class BoletoReader extends React.Component<BoletoReaderProps> {
    onBarCodeRead: (data: string) => void;

    constructor(props) {
        super(props);

        this.onBarCodeRead = _.once((data: string) => props.onBarCodeRead(data));
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    onBarCodeRead={this.onBarCodeRead}
                    keepAwake={true}
                />
                <View style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    bottom: 0,
                    left: 0,
                    position: "absolute",
                    right: 0,
                    top: 0
                    }}
                >
                </View>
            </View>
        );
    }
}

export default BoletoReader;
