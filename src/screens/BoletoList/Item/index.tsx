import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    ViewStyle,
} from "react-native";

import Card from "../../../components/Card";
import { colors } from "../../../constants";
import { formatDate } from "../../../utilities/FormatUtils";
import styles from "./styles";

export interface ItemStateProps {
    amount: string;
    barcode: string;
    dueDate: Date | null;
    title: string;
}

export interface ItemDispatchProps {
    onSelect: (barcode: string) => void;
}

type ItemProps = ItemStateProps & ItemDispatchProps;

function getInfoContainerStyle(dueDate: Date | null): ViewStyle {
    if (dueDate) {
        return StyleSheet.flatten([
            styles.infoContainer,
            styles.infoContainerDouble,
        ]);
    }

    return StyleSheet.flatten([
        styles.infoContainer,
        styles.infoContainerSingle,
    ]);
}

function renderInfo(title: string | null, dueDate: Date | null): JSX.Element {
    return (
        <View style={getInfoContainerStyle(dueDate)}>
            <Text style={styles.title} numberOfLines={1}>
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

function renderCardContent(props: ItemProps): JSX.Element {
    if (Platform.OS === "android") {
        return (
            <TouchableNativeFeedback
                onPress={props.onSelect.bind(null, props.barcode)}
            >
                <View style={styles.content}>
                    {renderInfo(props.title, props.dueDate)}
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
                {renderInfo(props.title, props.dueDate)}
                {renderAmount(props.amount)}
            </View>
        </TouchableHighlight>
    );
}

const Item: React.SFC<ItemStateProps & ItemDispatchProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.white}>
                {renderCardContent(props)}
            </Card>
        </View>
    );
};

export default Item;
