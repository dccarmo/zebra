import React from "react";
import { Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    ViewStyle } from "react-native";

import { colors } from "../../constants";
import Card from "../Card";
import styles from "./styles";

export interface BoletoListRowProps {
    amount: string;
    dueDate: Date|null;
    title: string|null;
    onPress: () => void;
}

function getInfoContainerStyle(dueDate: Date|null): ViewStyle {
    if (dueDate) {
        return StyleSheet.flatten([styles.infoContainer, styles.infoContainerDouble]);
    }

    return StyleSheet.flatten([styles.infoContainer, styles.infoContainerSingle]);
}

function renderInfo(title: string|null, dueDate: Date|null): JSX.Element {
    return (
        <View style={getInfoContainerStyle(dueDate)}>
            <Text style={styles.title}>{title ? title : "Desconhecido"}</Text>
            { dueDate &&
                <Text style={styles.dueDate}>{dueDate.toDateString()}</Text>
            }
        </View>
    );
}

function renderAmount(amount: string): JSX.Element {
    return (
        <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount}</Text>
        </View>
    );
}

function renderCardContent(props: BoletoListRowProps): JSX.Element {
    if (Platform.OS === "android") {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                <View style={styles.content}>
                    {renderInfo(props.title, props.dueDate)}
                    {renderAmount(props.amount)}
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableHighlight style={{borderRadius: 5}} onPress={props.onPress} underlayColor={colors.nobel}>
            <View style={styles.content}>
                {renderInfo(props.title, props.dueDate)}
                {renderAmount(props.amount)}
            </View>
        </TouchableHighlight>
    );
}

const BoletoListRow: React.SFC<BoletoListRowProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.white}>
                {renderCardContent(props)}
            </Card>
        </View>
    );
};

export default BoletoListRow;
