
import React from "react";
import { Image } from "react-native";

import TouchableButton from "../../components/TouchableButton";

export interface CloseButtonProps {
    onPress: () => void;
}

const CloseButton: React.SFC<CloseButtonProps> = (props) => (
    <TouchableButton onPress={props.onPress} >
        <Image source={require("../../../imgs/close_camera_icon.png")} />
    </TouchableButton>
);

export default CloseButton;
