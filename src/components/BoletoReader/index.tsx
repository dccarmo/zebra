import _ from "lodash";
import React from "react";
import { Button, View } from "react-native";
import Camera from "react-native-camera";

import styles from "./styles";

export interface BoletoReaderProps {
    onBarCodeRead: (data: string) => void;
    onDismiss: () => void;
}

class BoletoReader extends React.Component<BoletoReaderProps> {
    onBarCodeRead: (data: string) => void;

    constructor(props: BoletoReaderProps) {
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
                <Button
                onPress={this.props.onDismiss}
                title="Fechar"
                color="#841584"
                />
            </View>
        );
    }
}

export default BoletoReader;
