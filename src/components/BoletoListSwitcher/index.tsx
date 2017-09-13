import React from "react";
import { Platform, SegmentedControlIOS, View } from "react-native";
import { SceneMap, TabBar, TabViewAnimated } from "react-native-tab-view";

import BoletoListContainer from "../../containers/BoletoListContainer";
import Boleto from "../../models/Boleto";
import { customStyles } from "./styles";

export interface BoletoListSwitcherProps {
    onSelectBoleto: (boleto: Boleto) => void;
}

interface BoletoListSwitcherState {
    ios: {
        selectedIndex: number;
    };
    android: {
        index: number;
        routes: Array<{}>;
    };
}

export interface BoletoListSwitcherProps {
    onSelectBoleto: (boleto: Boleto) => void;
}

class BoletoListSwitcher extends React.Component<BoletoListSwitcherProps, BoletoListSwitcherState> {
    private renderScene = SceneMap({
        1: () => (<BoletoListContainer onSelectBoleto={this.props.onSelectBoleto} />),
        2: () => (<BoletoListContainer onSelectBoleto={this.props.onSelectBoleto} />),
        3: () => (<BoletoListContainer onSelectBoleto={this.props.onSelectBoleto} />),
    });

    constructor() {
        super();

        this.state = {
            android: {
                index: 0,
                routes: [
                    { key: "1", title: "Abertos" },
                    { key: "2", title: "Pagos" },
                    { key: "3", title: "Todos" },
                ],
            },
            ios: {
                selectedIndex: 0,
            },
        };
    }

    render() {
        if (Platform.OS === "android") {
            return (
                <TabViewAnimated
                style={customStyles.tabBarContainer}
                navigationState={this.state.android}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onRequestChangeTab={this.handleChangeTab.bind(this)}
                onIndexChange={() => null}
                />
            );
        }

        return (
            <View style={{flex: 1}}>
            <View style={customStyles.segmentedControlContainer}>
                <SegmentedControlIOS
                values={["Abertos", "Pagos", "Todos"]}
                selectedIndex={this.state.ios.selectedIndex}
                tintColor={customStyles.segmentedControl.tintColor}
                />
            </View>
            <BoletoListContainer
                onSelectBoleto={this.props.onSelectBoleto}
            />
            </View>
        );
    }

    private handleChangeTab(index: number) {
        this.setState({
            android: {
                ...this.state.android,
                index,
            },
        });
    }

    private renderHeader(props: any) {
        return (
            <TabBar
            {...props}
            style={customStyles.tabBar}
            />
        );
    }
}

export default BoletoListSwitcher;
