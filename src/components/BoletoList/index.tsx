import React from "react";
import { ListView, ListViewDataSource } from "react-native";

import { colors } from "../../constants";
import BoletoListRow from "../BoletoListRow";

// import styles from "./styles";

export interface BoletoListProps {
    dataSource: ListViewDataSource;
}

const BoletoList: React.SFC<BoletoListProps> = (props) => (
    <ListView
        style={{ backgroundColor: colors.alabaster }}
        dataSource={props.dataSource}
        renderRow={() => <BoletoListRow />}
    />
);

export default BoletoList;
