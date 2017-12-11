import React from 'react';
import {
    Platform,
    SegmentedControlIOS,
    View,
    ViewProperties,
} from 'react-native';
import { TabBar, TabViewAnimated } from 'react-native-tab-view';

import { colors } from '../../constants';

export interface SegmentedControlProps {
    onIndexChange: (index: number) => void;
    initialSelectedIndex: number;
    values: string[];
}

interface SegmentedControlState {
    android: {
        index: number;
        routes: Array<{ key: string; title: string }>;
    };
}

class SegmentedControl extends React.Component<
    SegmentedControlProps & ViewProperties,
    SegmentedControlState
> {
    constructor(props: SegmentedControlProps) {
        super(props);

        this.state = {
            android: {
                index: props.initialSelectedIndex,
                routes: props.values.map((value) => ({
                    key: value,
                    title: value,
                })),
            },
        };
    }

    render() {
        if (Platform.OS === 'android') {
            return (
                <TabViewAnimated
                    {...this.props}
                    navigationState={this.state.android}
                    onIndexChange={this.handleIndexChange.bind(this)}
                    renderHeader={this.renderHeader}
                    renderScene={this.renderScene.bind(this)}
                    style={customStyles.tabBarContainer}
                />
            );
        }

        return (
            <View {...this.props}>
                <View style={customStyles.segmentedControlContainer}>
                    <SegmentedControlIOS
                        onChange={(event) =>
                            this.handleIndexChange(
                                event.nativeEvent.selectedSegmentIndex,
                            )
                        }
                        selectedIndex={this.props.initialSelectedIndex}
                        tintColor={customStyles.segmentedControl.tintColor}
                        values={this.props.values}
                    />
                </View>
                {this.props.children}
            </View>
        );
    }

    private renderScene() {
        return this.props.children;
    }

    private handleIndexChange(index: number) {
        this.setState({
            android: {
                ...this.state.android,
                index,
            },
        });

        this.props.onIndexChange(index);
    }

    private renderHeader(props: any) {
        return <TabBar {...props} style={customStyles.tabBar} />;
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
