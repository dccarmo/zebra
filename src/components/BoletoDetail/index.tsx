import React from "react";
import { Text, View } from "react-native";

import { colors } from "../../constants";
import Card from "../Card";
import styles from "./styles";

export interface BoletoDetailProps {
    bank: string | null;
}

const BoletoDetail: React.SFC<BoletoDetailProps> = (props) => {
    return (
        <View style={styles.container}>
            <Card backgroundColor={colors.white}>
                <View>
                    <Text>{props.bank ? props.bank : "Desconhecido"}</Text>
                </View>
            </Card>
        </View>
    );
};

export default BoletoDetail;
