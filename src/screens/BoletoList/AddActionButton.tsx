import React from "react";
import { Image } from "react-native";
import ActionButton from "react-native-action-button";

import { colors } from "../../constants";

export interface AddActionButtonProps {
    onPress: () => void;
}

const AddActionButton: React.SFC<AddActionButtonProps> = (props) => (
    <ActionButton
        buttonColor={style.button.color}
        onPress={props.onPress}
        offsetX={style.button.offsetX}
        offsetY={style.button.offsetY}
        icon={(<Image source={require("../../../imgs/add_button_icon.png")} />)}
    />
);

export const style = {
    button: {
        color: colors.monza,
        offsetX: 16,
        offsetY: 16,
    },
};

export default AddActionButton;