import React from 'react';

import CameraOverlayContainer from './containers/CameraOverlayContainer';

class BarcodeReader extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <CameraOverlayContainer style={{ flex: 1 }} />
        );
    }
}

export default BarcodeReader;
