import React from 'react';
import { Image, TouchableOpacity, ViewProperties } from 'react-native';

export interface AddBarButtonProps extends ViewProperties {
    onPress: () => void;
}

const AddBarButton: React.SFC<AddBarButtonProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image source={require('../../../imgs/navigation_add_icon.png')} />
        </TouchableOpacity>
    );
};

export default AddBarButton;
