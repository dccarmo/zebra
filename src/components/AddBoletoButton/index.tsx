import React from "react";
import ActionButton from "react-native-action-button";

export interface AddBoletoButtonProps {
    onPress: () => void;
}

const AddBoletoButton: React.SFC<AddBoletoButtonProps> = (props) => (
    <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={props.onPress}
    />
);

export default AddBoletoButton;
