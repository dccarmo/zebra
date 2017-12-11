import { connect } from 'react-redux';

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
        message: 'Nenhum Boleto Selecionado',
    };
}

const BannerContainer = connect(mapStateToProps)(ShareBarButton);

export default BannerContainer;
