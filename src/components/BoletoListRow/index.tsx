import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export interface BoletoListRowProps {
    amount: string;
    bank: string|null;
    dueDate: Date|null;
    segment: string|null;
    title: string|null;
}

const BoletoListRow: React.SFC<BoletoListRowProps> = (props) =>  (
    <View style={styles.container}>
        <View style={styles.cell}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.bank}</Text>
                <Text style={styles.dueDate}>{props.dueDate ? props.dueDate.toDateString() : ""}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{props.amount}</Text>
            </View>
        </View>
    </View>
);

export default BoletoListRow;
