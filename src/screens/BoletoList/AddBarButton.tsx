import React from 'react';
import { Image, TouchableOpacity, ViewProperties } from 'react-native';

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

export default AddBarButton;
