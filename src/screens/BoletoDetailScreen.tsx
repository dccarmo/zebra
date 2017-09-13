import React from "react";
import { Platform, ScrollView } from "react-native";

import WebServerInfo from "../components/WebServerInfo";
import { colors } from "../constants";
import BoletoDetailContainer from "../containers/BoletoDetailContainer";

const navigatorButtonIds = {
    editBoletoButton: "editBoletoButton",
};

export enum WebServerStatus {
    Online,
    Offline,
}

class BoletoDetailScreen extends React.Component {
    static navigatorStyle = {
        navBarBackgroundColor: colors.monza,
        navBarButtonColor: colors.white,
        navBarNoBorder: true,
        navBarTextColor: colors.white,
        statusBarColor: colors.burgundy,
        topBarElevationShadowEnabled: false,
    };

    static navigatorButtons = () => {
        let icon: string;

        if (Platform.OS === "android") {
            icon = require("../../imgs/navigation_add_icon.png");
        } else {
            icon = require("../../imgs/navigation_add_icon.png");
        }

        return {
            rightButtons: [
                {
                    icon,
                    id: navigatorButtonIds.editBoletoButton,
                },
            ],
        };
    }

    constructor(props: any) {
        super(props);

        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    //   navigateToBoletoReader() {
    //     (this.props as any).navigator.showModal({
    //       navigatorStyle: {
    //         navBarHidden: true,
    //       },
    //       screen: "zebra.BoletoReaderScreen",
    //     });
    //   }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <WebServerInfo status={WebServerStatus.Online} />
                <BoletoDetailContainer barcode={(this.props as any).boleto.barcode} />
            </ScrollView>
        );
    }

    private onNavigatorEvent(event: any) {
        if (event.type === "NavBarButtonPress") {
            if (event.id === navigatorButtonIds.editBoletoButton) {
                // this.navigateToBoletoReader();
            }
        }
    }
}

export default BoletoDetailScreen;
