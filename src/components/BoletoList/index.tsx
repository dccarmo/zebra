import React from "react";
import { ListView, ListViewDataSource } from "react-native";

import Boleto, { getBank, getDueDate, getSegment } from "../../models/Boleto";
import BoletoListRow from "../BoletoListRow";
import BoletoListSection from "../BoletoListSection";

import styles from "./styles";

export interface BoletoListProps {
    dataSource: ListViewDataSource;
}

function renderRow(boleto: Boleto): JSX.Element  {
    return (
        <BoletoListRow
            amount= {""}
            bank= {getBank(boleto)}
            dueDate= {getDueDate(boleto)}
            segment= {getSegment(boleto)}
            title= {boleto.title}
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
