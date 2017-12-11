import { connect } from 'react-redux';

import I18n from '../../../constants/i18n';
import { getFormattedTypeableLine } from '../../../models/Boleto';
import { AppStore } from '../../../stores';
import ShareBarButton, { ShareBarButtonProps } from '../ShareBarButton';

function mapStateToProps(state: AppStore): ShareBarButtonProps {
    if (state.selectedBarcode) {
        return {
            message: getFormattedTypeableLine(state.selectedBarcode!),
        };
    }

    return {
        message: I18n.t('boletoDetail.shareBarButton.defaultMessage'),
    };
}

const BannerContainer = connect(mapStateToProps)(ShareBarButton);

export default BannerContainer;
