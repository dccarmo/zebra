import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Dispatch } from 'redux';

import { connect } from 'react-redux';
import {
    requestDeleteBoletoAction,
    toggleBoletoPaidAction,
} from '../../actions/index';
import TouchableButton from '../../components/TouchableButton';
import { colors } from '../../constants';
import I18n from '../../constants/i18n';
import { getBoleto } from '../../reducers/boletosReducer';
import { AppStore } from '../../stores/index';

interface ActionsProps {
    barcode: string;
    paid: boolean;
}

interface ActionsDispatchProps {
    onDeleteBoleto: (barcode: string) => void;
    onTogglePaid: (barcode: string) => void;
}

const Actions: React.SFC<ActionsProps & ActionsDispatchProps> = (props) => (
    <View style={styles.container}>
        <TouchableButton onPress={() => props.onTogglePaid(props.barcode)}>
            <View style={styles.actionButton}>
                <Text style={styles.actionButtonText}>
                    {props.paid
                        ? I18n.t('boletoDetail.actions.markAsPending')
                        : I18n.t('boletoDetail.actions.markAsPaid')}
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
                        onPress: () => props.onDeleteBoleto(props.barcode),
                        text: I18n.t('boletoDetail.delete.confirmButton'),
                    },
                ])
            }
        >
            <View style={styles.actionButton}>
                <Text style={styles.actionButtonText}>
                    {I18n.t('boletoDetail.actions.deleteButton')}
                </Text>
            </View>
        </TouchableButton>
    </View>
);

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
    },
    actionButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.monza },
    container: {
        margin: 16,
    },
});

interface ActionContainerProps {
    barcode: string;
}

function mapDispatchToProps(dispatch: Dispatch<any>): ActionsDispatchProps {
    return {
        onDeleteBoleto: (barcode) => {
            dispatch(requestDeleteBoletoAction({ barcode }));
        },
        onTogglePaid: (barcode) =>
            dispatch(toggleBoletoPaidAction({ barcode })),
    };
}

function mapStateToProps(
    state: AppStore,
    ownProps: ActionContainerProps,
): ActionsProps {
    const boleto = getBoleto(state, ownProps.barcode)!;

    return {
        barcode: boleto.barcode,
        paid: boleto.paid,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
