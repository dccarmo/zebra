import React from "react";
import { Image, TouchableOpacity } from "react-native";

export interface AddBarButtonProps {
    onPress: () => void;
}

const AddBarButton: React.SFC<AddBarButtonProps> = (props) => {
    return (
        <TouchableOpacity style={{ marginRight: 16 }} onPress={props.onPress}>
            <Image source={require("../../../imgs/navigation_add_icon.png")} />
        </TouchableOpacity>
    );
};

export default AddBarButton;
