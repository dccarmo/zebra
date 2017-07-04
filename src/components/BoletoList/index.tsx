import React from "react";
import { ListView, ListViewDataSource, Text } from "react-native";

// import styles from "./styles";

export interface BoletoListProps {
    dataSource: ListViewDataSource;
}

const BoletoList: React.SFC<BoletoListProps> = (props) => (
    // <View style={styles.container}>
    // <Text style={styles.welcome}>
    //     Welcome to React Native!
    // </Text>
    // <Text style={styles.instructions}>
    //     To get started, edit index.ios.js
    // </Text>
    // <Text style={styles.instructions}>
    //     Press Cmd+R to reload,{"\n"}
    //     Cmd+D or shake for dev menu
    // </Text>
    // </View>
    <ListView
        dataSource={props.dataSource}
        renderRow={() => <Text>Ola</Text>}
    />
);

export default BoletoList;
