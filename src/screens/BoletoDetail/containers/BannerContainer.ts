import { connect, Dispatch } from 'react-redux';

import { deselectBarcodeAction } from '../../../actions';
import { WebServerStatus } from '../../../models/WebServerInfo';
import { AppStore } from '../../../stores';
import Banner, { BannerDispatchProps, BannerStateProps } from '../Banner';

function mapStateToProps(state: AppStore): BannerStateProps {
    let description = 'Servidor Desconectado';

    switch (state.webServerInfo.status) {
        case WebServerStatus.Online:
            description = `Acesse o boleto em: ${state.webServerInfo.url}`;
            break;

        case WebServerStatus.Error:
        case WebServerStatus.Offline:
            description = 'Erro ao iniciar o servidor';
            break;

        case WebServerStatus.Starting:
            description = 'Servidor Iniciando';
            break;
    }

    return {
        description,
        status: state.webServerInfo.status,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): BannerDispatchProps {
    return {
        componentWillUnmount: () => dispatch(deselectBarcodeAction()),
    };
}

const BannerContainer = connect(mapStateToProps, mapDispatchToProps)(Banner);

export default BannerContainer;
