import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors } from "../constants";

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

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.09,
        shadowRadius: 6,
    },
});

export default Card;
