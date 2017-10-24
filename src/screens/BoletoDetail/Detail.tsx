import React from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";
import Card from "../../components/Card";
import { colors } from "../../constants";

export interface DetailProps {
    title: string;
}

const BoletoDetail: React.SFC<DetailProps> = (props) => {
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

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    content: {
        padding: 16,
    },
    dataBox: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: 16,
    },
    dataBoxText: {
        color: colors.mineShaft,
        fontSize: 24,
    },
    dataBoxTextRight: {
        color: colors.mineShaft,
        fontSize: 24,
        textAlign: "right",
    },
    dataBoxTitle: {
        color: colors.dustyGray,
        fontSize: 16,
        marginBottom: 8,
    },
    dataBoxTitleRight: {
        color: colors.dustyGray,
        fontSize: 16,
        marginBottom: 8,
        textAlign: "right",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        color: colors.mineShaft,
        flex: 1,
        fontSize: 24,
        justifyContent: "space-between",
    },
});

export default BoletoDetail;
