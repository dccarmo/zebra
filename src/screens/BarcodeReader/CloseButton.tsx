import React from 'react';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import TouchableButton from '../../components/TouchableButton';

export interface CloseButtonProps {
    onPress: () => void;
}

const CloseButton: React.SFC<CloseButtonProps> = (props) => (
    <TouchableButton onPress={props.onPress}>
        <Image source={require('../../../imgs/close_camera_icon.png')} />
    </TouchableButton>
);

function mapDispatchToProps(dispatch: any): CloseButtonProps {
    return {
        onPress: () => dispatch(NavigationActions.back()),
    };
}

export default connect(null, mapDispatchToProps)(CloseButton);
