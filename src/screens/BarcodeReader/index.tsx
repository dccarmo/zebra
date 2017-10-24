import React from "react";

import CameraReader from "./CameraReader";

class BarcodeReader extends React.Component {
    static navigationOptions = {
        header: null,
    };

    navigateToBoletoList() {
        (this.props as any).navigator.dismissModal({animationType: "slide-down"});
    }

    render() {
        return (
            <CameraReader />
        );
    }
}

export default BarcodeReader;
