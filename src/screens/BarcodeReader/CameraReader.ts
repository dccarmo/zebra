import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import { AddBoletoAction } from "../../actions";
import CameraOverlay, { CameraOverlayProps } from "./CameraOverlay";

function mapDispatchToProps(dispatch: any): CameraOverlayProps {
    return {
        onBarcodeRead: (barcode: string) => {
            dispatch(AddBoletoAction({ barcode, title: "", paid: true }));
        },
        onDismiss: () => (dispatch(NavigationActions.back())),
    };
}

const CameraReader = connect(null, mapDispatchToProps)(CameraOverlay);

export default CameraReader;
