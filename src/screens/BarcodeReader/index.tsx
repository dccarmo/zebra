import React from 'react';

import CameraOverlay from './CameraOverlay';

class BarcodeReader extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <CameraOverlay style={{ flex: 1 }} />
        );
    }
}

export default BarcodeReader;
