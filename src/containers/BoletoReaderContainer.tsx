import { connect } from "react-redux";

import { AddBoletoAction } from "../actions";
import BoletoReader, { BoletoReaderProps } from "../components/BoletoReader";

export interface BoletoReaderContainerProps {
    onBoletoAdded: () => void;
}

const mapDispatchToProps = (dispatch, ownProps: BoletoReaderContainerProps): BoletoReaderProps => {
  return {
    onBarCodeRead: (data) => {
      dispatch(AddBoletoAction({ data }));
      ownProps.onBoletoAdded();
    }
  };
};

const BoletoReaderContainer = connect<null, BoletoReaderProps, BoletoReaderContainerProps>(
  null,
  mapDispatchToProps
)(BoletoReader);

export default BoletoReaderContainer;
