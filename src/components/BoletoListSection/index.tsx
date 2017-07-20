import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

const BoletoListSection: React.SFC = () =>  (
    <View style={styles.container}>
        <Text style={styles.title}>Próximos 7 dias</Text>
    </View>
);

export default BoletoListSection;
