import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import CloseButton, { CloseButtonProps } from '../CloseButton';

function mapDispatchToProps(dispatch: any): CloseButtonProps {
    return {
        onPress: () => dispatch(NavigationActions.back()),
    };
}

const CloseButtonContainer = connect(null, mapDispatchToProps)(CloseButton);

export default CloseButtonContainer;
