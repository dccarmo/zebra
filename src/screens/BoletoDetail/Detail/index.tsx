import React from "react";
import { Text, View } from "react-native";

import { ScrollView, Share } from "react-native";
import Card from "../../../components/Card";
import TouchableButton from "../../../components/TouchableButton";
import { colors } from "../../../constants";
import styles from "./styles";

export interface DetailProps {
    amount: string;
    bank: string|null;
    barcode: string;
    dueDate: string|null;
    segment: string|null;
    title: string;
    typeableLine: string;
}

function renderFirstRow(props: DetailProps): JSX.Element {
    const content: JSX.Element[] = [];

    if (props.bank) {
        content.push((
            <View key="bank" style={styles.dataBox}>
                <Text style={styles.dataBoxTitle}>Banco</Text>
                <Text style={styles.dataBoxText}>{props.bank}</Text>
            </View>
        ));
    }

    if (!props.bank && props.segment) {
        content.push((
            <View key="segment" style={styles.dataBox}>
                <Text style={styles.dataBoxTitle}>Segmento</Text>
                <Text style={styles.dataBoxText}>{props.segment}</Text>
            </View>
        ));
    }

    if (props.dueDate) {
        if (content.length > 0) {
            content.push((
                <View key="dueDate" style={styles.dataBox}>
                    <Text style={styles.dataBoxTitleRight}>Data de Vencimento</Text>
                    <Text style={styles.dataBoxTextRight}>{props.dueDate}</Text>
                </View>
            ));
        } else {
            content.push((
                <View key="dueDate" style={styles.dataBox}>
                    <Text style={styles.dataBoxTitle}>Data de Vencimento</Text>
                    <Text style={styles.dataBoxText}>{props.dueDate}</Text>
                </View>
            ));
        }
    }

    return (
        <View style={styles.row}>
            {content}
        </View>
    );
}

function presentShareModal(message: string) {
    Share.share(
        {
            message,
            title: undefined,
            url: undefined,
        },
        {
            dialogTitle: undefined,
            excludedActivityTypes: [],
        },
    ).catch(() => null);
}

const BoletoDetail: React.SFC<DetailProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.white}>
                <View style={styles.content}>
                    <Text style={styles.title}>{props.title}</Text>
                    {renderFirstRow(props)}
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Valor</Text>
                            <Text style={styles.dataBoxText}>{props.amount}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Linha digitável</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <TouchableButton onPress={() => (presentShareModal(props.typeableLine))} >
                                    <Text style={styles.dataBoxText}>{props.typeableLine}</Text>
                                </TouchableButton>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Código de barras</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <TouchableButton onPress={() => (presentShareModal(props.barcode))} >
                                    <Text style={styles.dataBoxText}>{props.barcode}</Text>
                                </TouchableButton>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default BoletoDetail;
