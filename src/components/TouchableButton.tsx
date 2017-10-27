import React from "react";
import { Platform,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProperties,
    TouchableOpacity,
    TouchableOpacityProperties } from "react-native";

const TouchableButton: React.SFC<TouchableOpacityProperties & TouchableNativeFeedbackProperties> = (props: any) => {
    if (Platform.OS === "android") {
        return (<TouchableNativeFeedback {...props} >{props.children}</TouchableNativeFeedback>);
    }

    return (
        <TouchableOpacity {...props} >{props.children}</TouchableOpacity>
    );
};

export default TouchableButton;
