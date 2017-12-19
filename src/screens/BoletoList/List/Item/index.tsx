import React from 'react';
import {
    Platform,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectBarcodeAction } from '../../../../actions/index';
import Card from '../../../../components/Card';
import { colors } from '../../../../constants';
import { formatDate } from '../../../../utilities/FormatUtils';
import styles from './styles';

export interface ItemStateProps {
    amount: string;
    barcode: string;
    dueDate: Date | null;
    paid: boolean;
    title: string;
}

export interface ItemDispatchProps {
    onSelect: (barcode: string) => void;
}

type ItemProps = ItemStateProps & ItemDispatchProps;

function getInfoContainerStyle(dueDate: Date | null): ViewStyle[] {
    if (dueDate) {
        return [styles.infoContainer, styles.infoContainerDouble];
    }

    return [styles.infoContainer, styles.infoContainerSingle];
}

function renderInfo(
    title: string | null,
    dueDate: Date | null,
    paid: boolean,
): JSX.Element {
    const titleStyle = [styles.title];

    if (paid) {
        titleStyle.push(styles.titlePaid);
    }

    return (
        <View style={getInfoContainerStyle(dueDate)}>
            <Text style={titleStyle} numberOfLines={1}>
                {title}
            </Text>
            {dueDate && (
                <Text style={styles.dueDate}>{formatDate(dueDate)}</Text>
            )}
        </View>
    );
}

function renderAmount(amount: string): JSX.Element {
    return (
        <View style={styles.amountContainer}>
            <Text style={styles.amount} numberOfLines={1}>
                {amount}
            </Text>
        </View>
    );
}

function renderContent(props: ItemProps): JSX.Element {
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback
                onPress={props.onSelect.bind(null, props.barcode)}
            >
                <View style={styles.content} pointerEvents="box-only">
                    {renderInfo(props.title, props.dueDate, props.paid)}
                    {renderAmount(props.amount)}
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableHighlight
            style={{ borderRadius: 5 }}
            onPress={props.onSelect.bind(null, props.barcode)}
            underlayColor={colors.nobel}
        >
            <View style={styles.content}>
                {renderInfo(props.title, props.dueDate, props.paid)}
                {renderAmount(props.amount)}
            </View>
        </TouchableHighlight>
    );
}

const Item: React.SFC<ItemStateProps & ItemDispatchProps> = (props) => {
    return <Card style={styles.card}>{renderContent(props)}</Card>;
};

function mapDispatchToProps(dispatch: Dispatch<any>): ItemDispatchProps {
    return {
        onSelect: (barcode: string) => {
            dispatch(selectBarcodeAction(barcode));
        },
    };
}

export default connect(null, mapDispatchToProps)(Item);
