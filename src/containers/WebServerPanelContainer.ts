import { connect } from "react-redux";

import WebServerPanel, { WebServerPanelProps } from "../components/WebServerPanel";
import AppStore from "../stores/AppStore";

const WebServerPanelContainer = connect(
    (state: AppStore): WebServerPanelProps => {
        return {
            serverStatus: state.webServerStore.serverStatus,
        };
    },
)(WebServerPanel);

export default WebServerPanelContainer;
