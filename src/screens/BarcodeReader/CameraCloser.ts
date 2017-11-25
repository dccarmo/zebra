import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import CloseButton, { CloseButtonProps } from "./CloseButton";

function mapDispatchToProps(dispatch: any): CloseButtonProps {
    return {
        onPress: () => (dispatch(NavigationActions.back())),
    };
}

const CameraReader = connect(null, mapDispatchToProps)(CloseButton);

export default CameraReader;
