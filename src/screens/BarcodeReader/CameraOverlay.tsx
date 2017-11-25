import { once } from "lodash";
import React from "react";
import Camera from "react-native-camera";

export interface CameraOverlayProps {
    onBarcodeRead: (data: any) => void;
}

class CameraOverlay extends React.Component<CameraOverlayProps> {
    onBarcodeRead: (data: string) => void;

    constructor(props: CameraOverlayProps) {
        super(props);

        this.onBarcodeRead = once((data: string) => props.onBarcodeRead(data));
    }

    render() {
        return (
            <Camera
            style={{ flex: 1 }}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this.props.onBarcodeRead}
            keepAwake={true}
            >
            {this.props.children}
            </Camera>
        );
    }
}

export default CameraOverlay;
