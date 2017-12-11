import { connect } from 'react-redux';

import BoletoListNavigatorWrapper from '../components/BoletoListNavigatorWrapper';
import { AppStore } from '../stores';

const BoletoListNavigatorContainer = connect((state: AppStore): any => {
    return {
        navigation: state.navigation,
    };
})(BoletoListNavigatorWrapper);

export default BoletoListNavigatorContainer;
