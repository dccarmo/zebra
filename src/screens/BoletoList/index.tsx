import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import { maroonHeaderStyle } from "../../constants";
import { colors } from "../../constants";
import AddActionButton from "./AddActionButton";
import AddBarButton from "./AddBarButton";
import CameraOpener from "./CameraOpener";
import FilteredList from "./FilteredList";
import SegmentedControl from "./SegmentedControl";

const AddButton = Platform.OS === "ios" ? CameraOpener(AddBarButton) : CameraOpener(AddActionButton);

interface BoletoListState {
    selectedIndex: number;
}

class BoletoList extends React.Component<{}, BoletoListState> {
    static navigationOptions = {
        ...maroonHeaderStyle,
        headerRight: Platform.OS === "ios" ? (<AddButton />) : null,
        title: "Boletos",
    };

    constructor() {
        super();

        this.state = {
            selectedIndex: 0,
        };
    }

    componentWillMount() {
        StatusBar.setHidden(false, "slide");
        StatusBar.setBarStyle("light-content");

        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor(colors.burgundy);
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <SegmentedControl
                initialSelectedIndex={0}
                onIndexChange={(index) => (this.setState({ selectedIndex: index }))}
                values={["Pendentes", "Pagos", "Todos"]}
                >
                    <FilteredList
                    selectedFilter={this.state.selectedIndex}
                    />
                </SegmentedControl>
                {Platform.OS === "android" &&
                    <AddButton />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.blackSqueeze,
        flex: 1,
    },
});

export default BoletoList;
