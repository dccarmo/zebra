import React from "react";
import ActionButton from "react-native-action-button";

import { colors } from "../../constants";

export interface AddBoletoButtonProps {
    onPress: () => void;
}

const AddBoletoButton: React.SFC<AddBoletoButtonProps> = (props) => (
    <ActionButton
        buttonColor={colors.monza}
        onPress={props.onPress}
    />
);

export default AddBoletoButton;
