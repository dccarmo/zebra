import React from "react";
import { Image } from "react-native";
import ActionButton from "react-native-action-button";

import { customStyles } from "./styles";

export interface AddBoletoButtonProps {
    onPress: () => void;
}

const AddBoletoButton: React.SFC<AddBoletoButtonProps> = (props) => (
    <ActionButton
        buttonColor={customStyles.button.color}
        onPress={props.onPress}
        offsetX={customStyles.button.offsetX}
        offsetY={customStyles.button.offsetY}
        icon={(<Image source={require("../../../imgs/add_button_icon.png")} />)}
    />
);

export default AddBoletoButton;
