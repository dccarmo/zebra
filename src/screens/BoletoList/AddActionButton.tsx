import React from 'react';
import { Image, ViewProperties } from 'react-native';
import ActionButton from 'react-native-action-button';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { colors } from '../../constants';

export interface AddActionButtonProps {
    onPress: () => void;
}

const AddActionButton: React.SFC<
    AddActionButtonProps & ViewProperties
> = (props) => (
    <ActionButton
        {...props}
        buttonColor={style.button.color}
        onPress={props.onPress}
        offsetX={style.button.offsetX}
        offsetY={style.button.offsetY}
        icon={<Image source={require('../../../imgs/add_button_icon.png')} />}
    />
);

export const style = {
    button: {
        color: colors.monza,
        offsetX: 16,
        offsetY: 16,
    },
};

function mapDispatchToProps(dispatch: any) {
    return {
        onPress: () =>
            dispatch(
                NavigationActions.navigate({ routeName: 'BarcodeReader' }),
            ),
    };
}

export default connect(null, mapDispatchToProps)(AddActionButton);
