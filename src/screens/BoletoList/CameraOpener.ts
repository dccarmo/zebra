import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch: any) {
    return {
        onPress: () => (dispatch(NavigationActions.navigate({ routeName: "BarcodeReader" }))),
    };
}

const CameraOpener = connect(null, mapDispatchToProps);

export default CameraOpener;
