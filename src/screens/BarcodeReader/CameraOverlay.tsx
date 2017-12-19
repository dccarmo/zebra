import { once } from 'lodash';
import React from 'react';
import { StyleSheet, View, ViewProperties } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addBoletoAction } from '../../actions/index';
import CloseButton from './CloseButton';

export interface CameraOverlayProps {
    onBarcodeRead: (data: any) => void;
}

class CameraOverlay extends React.Component<
    CameraOverlayProps & ViewProperties
> {
    onBarcodeRead: (data: any) => void;

    constructor(props: CameraOverlayProps) {
        super(props);

        this.onBarcodeRead = once((data: any) => props.onBarcodeRead(data));
    }

    render() {
        return (
            <Camera
                {...this.props}
                aspect={Camera.constants.Aspect.fill}
                onBarCodeRead={this.onBarcodeRead}
                barCodeTypes={[Camera.constants.BarCodeType.interleaved2of5]}
                keepAwake={true}
            >
                <View style={styles.overlay}>
                    <View style={styles.leftStripe} />
                    <View style={styles.middleStripe} />
                    <View style={styles.rightStripe}>
                        <CloseButton />
                    </View>
                </View>
            </Camera>
        );
    }
}

const styles = StyleSheet.create({
    leftStripe: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
    },
    middleStripe: {
        flex: 2,
    },
    overlay: {
        flex: 1,
        flexDirection: 'row',
    },
    rightStripe: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        paddingTop: 30,
    },
});

function mapDispatchToProps(dispatch: Dispatch<any>): CameraOverlayProps {
    return {
        onBarcodeRead: (barcode) =>
            dispatch(
                addBoletoAction({
                    barcode: barcode.data,
                }),
            ),
    };
}

export default connect(null, mapDispatchToProps)(CameraOverlay);
