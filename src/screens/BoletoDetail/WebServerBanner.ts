import { connect, Dispatch } from "react-redux";

import { StartWebServerAction, StopWebServerAction } from "../../actions";
import { WebServerStatus } from "../../models/WebServerInfo";
import { AppStore } from "../../stores";
import Banner, {
    BannerDispatchProps,
    BannerStateProps } from "./Banner";

function mapStateToProps(state: AppStore): BannerStateProps {
    let description = "Servidor Desconectado";

    switch (state.webServerInfo.status) {
        case WebServerStatus.Online:
            description = `Acesse o boleto em: ${state.webServerInfo.url}`;
            break;

        case WebServerStatus.Error:
            description = "Erro ao iniciar o servidor";
            break;

        case WebServerStatus.Starting:
            description = "Servidor Iniciando";
            break;
    }

    return {
        description,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): BannerDispatchProps {
    return {
        componentDidMount: () => (dispatch(StartWebServerAction())),
        componentWillUnmount: () => (dispatch(StopWebServerAction())),
    };
}

const WebServerBanner = connect(mapStateToProps, mapDispatchToProps)(Banner);

export default WebServerBanner;
