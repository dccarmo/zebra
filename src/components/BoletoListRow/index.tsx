import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

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

const BoletoListRow: React.SFC<BoletoListRowProps> = (props) =>  (
    <View style={styles.container}>
        <View style={styles.cell}>
            {renderInfo(props.title, props.dueDate)}
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{props.amount}</Text>
            </View>
        </View>
    </View>
);

export default BoletoListRow;
