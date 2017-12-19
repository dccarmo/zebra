import React from 'react';
import { Image, TouchableOpacity, ViewProperties } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

export interface AddBarButtonProps {
    onPress: () => void;
}

const AddBarButton: React.SFC<AddBarButtonProps & ViewProperties> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image source={require('../../../imgs/navigation_add_icon.png')} />
        </TouchableOpacity>
    );
};

function mapDispatchToProps(dispatch: any) {
    return {
        onPress: () =>
            dispatch(
                NavigationActions.navigate({ routeName: 'BarcodeReader' }),
            ),
    };
}

export default connect(null, mapDispatchToProps)(AddBarButton);
