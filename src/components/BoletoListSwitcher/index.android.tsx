import React from "react";
import { SceneMap, TabBar, TabViewAnimated } from "react-native-tab-view";

import BoletoListContainer from "../../containers/BoletoListContainer";
import { customStyles } from "./styles";

interface BoletoListSwitcherState {
    index: number;
    routes: Array<{}>;
}

class BoletoListSwitcher extends React.Component<any, BoletoListSwitcherState> {
    private renderScene = SceneMap({
        1: () => (<BoletoListContainer />),
        2: () => (<BoletoListContainer />),
        3: () => (<BoletoListContainer />),
    });

    constructor() {
        super();

        this.state = {
            index: 0,
            routes: [
                { key: "1", title: "Abertos" },
                { key: "2", title: "Pagos" },
                { key: "3", title: "Todos" },
            ],
        };
    }

    render() {
        return (
            <TabViewAnimated
            style={customStyles.tabBarContainer}
            navigationState={this.state}
            renderScene={this.renderScene}
            renderHeader={this.renderHeader}
            onRequestChangeTab={this.handleChangeTab.bind(this)}
            />
        );
    }

    private handleChangeTab(index: number) {
        this.setState({ index });
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
