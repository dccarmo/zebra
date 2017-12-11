import { connect, Dispatch } from 'react-redux';

import { deselectBarcodeAction } from '../../../actions';
import I18n from '../../../constants/i18n';
import { WebServerStatus } from '../../../models/WebServerInfo';
import { AppStore } from '../../../stores';
import Banner, { BannerDispatchProps, BannerStateProps } from '../Banner';

function mapStateToProps(state: AppStore): BannerStateProps {
    let description = I18n.t('boletoDetail.banner.status.default');

    switch (state.webServerInfo.status) {
        case WebServerStatus.Online:
            description = I18n.t('boletoDetail.banner.status.online', {
                url: state.webServerInfo.url,
            });
            break;

        case WebServerStatus.Error:
        case WebServerStatus.Offline:
            description = I18n.t('boletoDetail.banner.status.errorOffline');
            break;

        case WebServerStatus.Starting:
            description = I18n.t('boletoDetail.banner.status.starting');
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
