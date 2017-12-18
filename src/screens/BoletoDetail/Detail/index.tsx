import React from 'react';
import {
    Alert,
    Platform,
    Text,
    TextInput,
    ToastAndroid,
    TouchableWithoutFeedback,
    View,
    ViewProperties,
} from 'react-native';

import { Clipboard, ScrollView } from 'react-native';
import Card from '../../../components/Card';
import TouchableButton from '../../../components/TouchableButton';
import { colors } from '../../../constants';
import I18n from '../../../constants/i18n';
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
    onDeleteBoleto: (barcode: string) => void;
    onTogglePaid: (barcode: string) => void;
}

function renderFirstRow(props: DetailStateProps): JSX.Element {
    const content: JSX.Element[] = [];

    if (props.bank) {
        content.push(
            <View key="bank" style={styles.dataBox}>
                <Text style={styles.dataBoxTitle}>{I18n.t('global.bank')}</Text>
                <Text style={styles.dataBoxText}>{props.bank}</Text>
            </View>,
        );
    }

    if (!props.bank && props.segment) {
        content.push(
            <View key="segment" style={styles.dataBox}>
                <Text style={styles.dataBoxTitle}>
                    {I18n.t('global.segment')}
                </Text>
                <Text style={styles.dataBoxText}>{props.segment}</Text>
            </View>,
        );
    }

    if (props.dueDate) {
        if (content.length > 0) {
            content.push(
                <View key="dueDate" style={styles.dataBox}>
                    <Text style={styles.dataBoxTitleRight}>
                        {I18n.t('global.dueDate')}
                    </Text>
                    <Text style={styles.dataBoxTextRight}>
                        {formatDate(props.dueDate)}
                    </Text>
                </View>,
            );
        } else {
            content.push(
                <View key="dueDate" style={styles.dataBox}>
                    <Text style={styles.dataBoxTitle}>
                        {I18n.t('global.dueDate')}
                    </Text>
                    <Text style={styles.dataBoxText}>
                        {formatDate(props.dueDate)}
                    </Text>
                </View>,
            );
        }
    }

    return <View style={styles.row}>{content}</View>;
}

const BoletoDetail: React.SFC<
    DetailStateProps & DetailDispatchProps & ViewProperties
> = (props) => {
    return (
        <View {...props}>
            <Card style={{ backgroundColor: colors.white }}>
                <View style={styles.content}>
                    <TextInput
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        onChangeText={(text) =>
                            props.onChangeTitle(props.barcode, text)
                        }
                        placeholder={I18n.t(
                            'boletoDetail.detail.titlePlaceholder',
                        )}
                        returnKeyType={'done'}
                        style={styles.title}
                        defaultValue={props.title ? props.title : undefined}
                        underlineColorAndroid={colors.transparent}
                    />
                    {renderFirstRow(props)}
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>
                                {I18n.t('global.amount')}
                            </Text>
                            <Text style={styles.dataBoxText}>
                                {props.amount}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataBoxTitle}>
                                {I18n.t('global.typeableLine')}
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        Clipboard.setString(props.typeableLine);

                                        if (Platform.OS === 'android') {
                                            ToastAndroid.show(
                                                I18n.t(
                                                    'boletoDetail.detail.copied',
                                                ),
                                                ToastAndroid.SHORT,
                                            );
                                        }
                                    }}
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
                                {I18n.t('global.barcode')}
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        Clipboard.setString(props.barcode);

                                        if (Platform.OS === 'android') {
                                            ToastAndroid.show(
                                                I18n.t(
                                                    'boletoDetail.detail.copied',
                                                ),
                                                ToastAndroid.SHORT,
                                            );
                                        }
                                    }}
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
                                ? I18n.t('boletoDetail.detail.markAsPending')
                                : I18n.t('boletoDetail.detail.markAsPaid')}
                        </Text>
                    </View>
                </TouchableButton>
                <TouchableButton
                    onPress={() =>
                        Alert.alert(I18n.t('boletoDetail.delete.title'), undefined, [
                            {
                                text: I18n.t('boletoDetail.delete.cancelButton'),
                            },
                            {
                                onPress: () =>
                                    props.onDeleteBoleto(props.barcode),
                                text: I18n.t('boletoDetail.delete.confirmButton'),
                            },
                        ])
                    }
                >
                    <View style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>
                            {I18n.t('boletoDetail.detail.deleteButton')}
                        </Text>
                    </View>
                </TouchableButton>
            </View>
        </View>
    );
};

export default BoletoDetail;
