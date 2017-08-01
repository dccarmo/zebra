import * as accounting from "accounting";
import React from "react";
import { ListView, ListViewDataSource } from "react-native";

import Boleto, {BoletoType,
    getBarcodeAmount,
    getBarcodeBank,
    getBarcodeDueDate,
    getBarcodeSegment,
    getBarcodeType } from "../../models/Boleto";
import BoletoListRow from "../BoletoListRow";
import BoletoListSection from "../BoletoListSection";

import styles from "./styles";

export interface BoletoListProps {
    dataSource: ListViewDataSource;
}

const accountingSettings = {
    decimal: ",",
    symbol: "R$",
    thousand: ".",
};

function getAmount(barcode: string): string {
    return `${accounting.formatMoney(getBarcodeAmount(barcode), accountingSettings)}`;
}

function getTitle(boleto: Boleto): string|null {
    if (boleto.title) {
        return boleto.title;
    }

    if (getBarcodeType(boleto.barcode) === BoletoType.Bank) {
        return getBarcodeBank(boleto.barcode);
    }

    return getBarcodeSegment(boleto.barcode);
}

function renderRow(boleto: Boleto): JSX.Element  {
    return (
        <BoletoListRow
            amount={getAmount(boleto.barcode)}
            dueDate={getBarcodeDueDate(boleto.barcode)}
            title={getTitle(boleto)}
        />
    );
}

const BoletoList: React.SFC<BoletoListProps> = (props) => (
    <ListView
        dataSource={props.dataSource}
        renderRow={renderRow}
        renderSectionHeader={() => (<BoletoListSection />)}
        stickySectionHeadersEnabled={false}
        style={styles.list}
    />
);

export default BoletoList;
