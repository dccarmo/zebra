import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import { addBoletoAction } from "../../actions";
import CameraOverlay, { CameraOverlayProps } from "./CameraOverlay";

function mapDispatchToProps(dispatch: any): CameraOverlayProps {
    return {
        onBarcodeRead: (barcode: any) => {
            dispatch(addBoletoAction({ barcode: barcode.data, title: null, paid: false }));
            dispatch(NavigationActions.back());
        },
    };
}

const CameraReader = connect(null, mapDispatchToProps)(CameraOverlay);

export default CameraReader;
