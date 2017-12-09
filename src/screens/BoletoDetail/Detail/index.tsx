import React from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { ScrollView, Share } from 'react-native';
import Card from '../../../components/Card';
import TouchableButton from '../../../components/TouchableButton';
import { colors } from '../../../constants';
import { formatDate } from '../../../utilities/FormatUtils';
import styles from './styles';

export interface DetailStateProps {
    amount: string;
    bank: string | null;
    barcode: string;
    dueDate: Date | null;
    paid: boolean;
    segment: string | null;
    title: string | null;
    typeableLine: string;
}

export interface DetailDispatchProps {
    onChangeTitle: (barcode: string, title: string) => void;
    onTogglePaid: (barcode: string) => void;
}

function renderFirstRow(props: DetailStateProps): JSX.Element {
    const content: JSX.Element[] = [];

    if (props.bank) {
        content.push(
            <View key="bank" style={styles.dataBox}>
                <Text style={styles.dataBoxTitle}>Banco</Text>
                <Text style={styles.dataBoxText}>{props.bank}</Text>
            </View>,
        );
    }

    if (!props.bank && props.segment) {
        content.push(
            <View key="segment" style={styles.dataBox}>
                <Text style={styles.dataBoxTitle}>Segmento</Text>
                <Text style={styles.dataBoxText}>{props.segment}</Text>
            </View>,
        );
    }

    if (props.dueDate) {
        if (content.length > 0) {
            content.push(
                <View key="dueDate" style={styles.dataBox}>
                    <Text style={styles.dataBoxTitleRight}>
                        Data de Vencimento
                    </Text>
                    <Text style={styles.dataBoxTextRight}>
                        {formatDate(props.dueDate)}
                    </Text>
                </View>,
            );
        } else {
            content.push(
                <View key="dueDate" style={styles.dataBox}>
                    <Text style={styles.dataBoxTitle}>Data de Vencimento</Text>
                    <Text style={styles.dataBoxText}>
                        {formatDate(props.dueDate)}
                    </Text>
                </View>,
            );
        }
    }

    return <View style={styles.row}>{content}</View>;
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

const BoletoDetail: React.SFC<
    DetailStateProps & DetailDispatchProps
> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.white}>
                <View style={styles.content}>
                    <TextInput
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        onChangeText={(text) =>
                            props.onChangeTitle(props.barcode, text)
                        }
                        placeholder={'Insira um título'}
                        returnKeyType={'done'}
                        style={styles.title}
                        defaultValue={props.title ? props.title : undefined}
                        underlineColorAndroid={colors.transparent}
                    />
                    {renderFirstRow(props)}
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>Valor</Text>
                            <Text style={styles.dataBoxText}>
                                {props.amount}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>
                                Linha digitável
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() =>
                                        presentShareModal(props.typeableLine)
                                    }
                                >
                                    <View>
                                        <Text style={styles.dataBoxText}>
                                            {props.typeableLine}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>
                                Código de barras
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() =>
                                        presentShareModal(props.barcode)
                                    }
                                >
                                    <View>
                                        <Text style={styles.dataBoxText}>
                                            {props.barcode}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Card>
            <View style={styles.actionButtonList}>
                <TouchableButton
                    onPress={() => props.onTogglePaid(props.barcode)}
                >
                    <View style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>
                            {props.paid
                                ? 'Marcar como não pago'
                                : 'Marcar como pago'}
                        </Text>
                    </View>
                </TouchableButton>
            </View>
        </View>
    );
};

export default BoletoDetail;
