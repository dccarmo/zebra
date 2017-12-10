import React from 'react';
import {
    Platform,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProperties,
    TouchableOpacity,
    TouchableOpacityProperties,
    View,
} from 'react-native';

export type TouchableButtonProps = TouchableOpacityProperties &
    TouchableNativeFeedbackProperties;

const TouchableButton: React.SFC<TouchableButtonProps> = (props: any) => {
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback {...props}>
                <View pointerEvents="box-only">{props.children}</View>
            </TouchableNativeFeedback>
        );
    }

    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

export default TouchableButton;
