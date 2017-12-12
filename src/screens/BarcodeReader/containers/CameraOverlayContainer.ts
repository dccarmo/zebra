import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { addBoletoAction } from '../../../actions';
import CameraOverlay, { CameraOverlayProps } from '../CameraOverlay';

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

const CameraOverlayContainer = connect(null, mapDispatchToProps)(CameraOverlay);

export default CameraOverlayContainer;
