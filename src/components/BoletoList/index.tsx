import React from "react";
import { ListView, ListViewDataSource } from "react-native";

import BoletoListRow from "../BoletoListRow";
import BoletoListSection from "../BoletoListSection";

import styles from "./styles";

export interface BoletoListProps {
    dataSource: ListViewDataSource;
}

const BoletoList: React.SFC<BoletoListProps> = (props) => (
    <ListView
        dataSource={props.dataSource}
        renderRow={() => (<BoletoListRow />)}
        renderSectionHeader={() => (<BoletoListSection />)}
        stickySectionHeadersEnabled={false}
        style={styles.list}
    />
);

export default BoletoList;
