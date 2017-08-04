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

const BoletoListRow: React.SFC<BoletoListRowProps> = (props) => {
    if (Platform.OS === "android") {
        return (
            <View style={styles.container}>
                <Card backgroundColor={colors.white}>
                    <TouchableNativeFeedback>
                        <View style={styles.cardContainer}>
                            {renderInfo(props.title, props.dueDate)}
                            {renderAmount(props.amount)}
                        </View>
                    </TouchableNativeFeedback>
                </Card>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={{borderRadius: 5}}>
                <View>
                    <Card backgroundColor={colors.white}>
                        <View style={styles.cardContainer}>
                            {renderInfo(props.title, props.dueDate)}
                            {renderAmount(props.amount)}
                        </View>
                    </Card>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default BoletoListRow;
