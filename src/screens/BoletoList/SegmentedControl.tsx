import React from "react";
import { Platform, SegmentedControlIOS, View } from "react-native";
import { TabBar, TabViewAnimated } from "react-native-tab-view";

import { colors } from "../../constants";

export interface SegmentedControlProps {
    values: string[];
    onIndexChange: (index: number) => void;
}

interface SegmentedControlState {
    ios: {
        selectedIndex: number;
    };
    android: {
        index: number;
        routes: Array<{ key: string, title: string }>;
    };
}

class SegmentedControl extends React.Component<SegmentedControlProps, SegmentedControlState> {
    constructor(props: SegmentedControlProps) {
        super(props);

        this.state = {
            android: {
                index: 0,
                routes: props.values.map((value) => ({ key: value, title: value })),
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
                renderScene={this.renderScene.bind(this)}
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
                    values={this.props.values}
                    selectedIndex={this.state.ios.selectedIndex}
                    tintColor={customStyles.segmentedControl.tintColor}
                    />
                </View>
                {this.props.children}
            </View>
        );
    }

    private renderScene() {
        return this.props.children;
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

const customStyles = {
    segmentedControl: {
        tintColor: colors.white,
    },
    segmentedControlContainer: {
        backgroundColor: colors.monza,
        height: 54,
        padding: 12,
    },
    tabBar: {
        backgroundColor: colors.monza,
    },
    tabBarContainer: {
        flex: 1,
    },
};

export default SegmentedControl;
