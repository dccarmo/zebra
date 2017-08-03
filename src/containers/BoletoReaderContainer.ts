import { connect } from "react-redux";

import { AddBoletoAction } from "../actions";
import BoletoReader, { BoletoReaderProps } from "../components/BoletoReader";

export interface BoletoReaderContainerProps {
    onBoletoAdded: () => void;
    onDismiss: () => void;
}

const BoletoReaderContainer = connect<null, BoletoReaderProps, BoletoReaderContainerProps>(
    null,
    (dispatch: any, ownProps: BoletoReaderContainerProps): BoletoReaderProps => {
        return {
            onBarCodeRead: (data) => {
            dispatch(AddBoletoAction({ barcode: data, title: "", paid: true }));
            ownProps.onBoletoAdded();
            },
            onDismiss: ownProps.onDismiss,
        };
    },
)(BoletoReader as any);

export default BoletoReaderContainer;
