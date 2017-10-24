import React from "react";
import { Platform, View } from "react-native";

import { maroonHeaderStyle } from "../../constants";
import AddActionButton from "./AddActionButton";
import AddBarButton from "./AddBarButton";
import CameraOpener from "./CameraOpener";
import FilteredList from "./FilteredList";
import SegmentedControl from "./SegmentedControl";

const AddButton = Platform.OS === "ios" ? CameraOpener(AddBarButton) : CameraOpener(AddActionButton);

class BoletoList extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
        headerRight: Platform.OS === "ios" ? (<AddButton />) : null,
        title: "Boletos",
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SegmentedControl onIndexChange={() => null} values={["Abertos", "Pagos", "Todos"]}>
                    <FilteredList />
                </SegmentedControl>
                {Platform.OS === "android" &&
                    <AddButton />
                }
            </View>
        );
    }
}

export default BoletoList;
