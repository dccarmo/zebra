import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import AddActionButton from '../AddActionButton';
import AddBarButton from '../AddBarButton';

function mapDispatchToProps(dispatch: any) {
    return {
        onPress: () =>
            dispatch(
                NavigationActions.navigate({ routeName: 'BarcodeReader' }),
            ),
    };
}

const CameraOpener =
    Platform.OS === 'ios'
        ? connect(null, mapDispatchToProps)(AddBarButton)
        : connect(null, mapDispatchToProps)(AddActionButton);

export default CameraOpener;
