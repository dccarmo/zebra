import React from "react";
import { Text, View } from "react-native";

import { colors } from "../../constants";
import Card from "../Card";
import styles from "./styles";

export interface BoletoDetailProps {
    title: string;
}

const BoletoDetail: React.SFC<BoletoDetailProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.white}>
                <View style={styles.content}>
                    <Text style={styles.title}>{props.title}</Text>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Banco</Text>
                            <Text style={styles.dataBoxText}>{props.title}</Text>
                        </View>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitleRight}>Data de Vencimento</Text>
                            <Text style={styles.dataBoxTextRight}>13/09/2017</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Valor</Text>
                            <Text style={styles.dataBoxText}>R$400,00</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Linha digitável</Text>
                            <Text style={styles.dataBoxText}>R$400,00</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Código de barras</Text>
                            <Text style={styles.dataBoxText}>R$400,00</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default BoletoDetail;
