import React from "react";

import BoletoReaderContainer from "../containers/BoletoReaderContainer";

class BoletoReaderScreen extends React.Component {
    navigateToBoletoList() {
        (this.props as any).navigator.dismissModal({animationType: "slide-down"});
    }

    render() {
        return (
            <BoletoReaderContainer
                onBoletoAdded={ () => this.navigateToBoletoList() }
                onDismiss={ () => this.navigateToBoletoList() }
            />
        );
    }
}

export default BoletoReaderScreen;
