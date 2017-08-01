import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import styles from "./styles";

export interface CardProps {
    backgroundColor: string;
}

function getStyle(props: CardProps): ViewStyle {
    const backgroundStyle = StyleSheet.create({
        container: {
            backgroundColor: props.backgroundColor,
        },
    });

    return StyleSheet.flatten([styles.container, backgroundStyle.container]);
}

const Card: React.SFC<CardProps> = (props) => (
    <View style={getStyle(props)}>
        {props.children}
    </View>
);

export default Card;
