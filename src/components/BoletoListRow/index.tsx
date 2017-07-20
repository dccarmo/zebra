import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export interface BoletoListRowProps {
    onBarCodeRead: (data: string) => void;
    onDismiss: () => void;
}

const BoletoListRow: React.SFC = () =>  (
    <View style={styles.container}>
        <View style={styles.cell}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Unimed (Itaú)</Text>
                <Text style={styles.dueDate}>16/07/2017</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>R$206,35</Text>
            </View>
        </View>
    </View>
);

export default BoletoListRow;
