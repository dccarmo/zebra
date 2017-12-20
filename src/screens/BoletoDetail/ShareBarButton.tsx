import React from 'react';
import { Image, Share, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { getFormattedTypeableLine } from '../../models/Boleto';
import { AppStore } from '../../stores/index';

export interface ShareBarButtonProps {
    message: string;
}

function presentShareModal(message: string) {
    Share.share(
        {
            message,
            title: undefined,
            url: undefined,
        },
        {
            dialogTitle: undefined,
            excludedActivityTypes: [],
        },
    ).catch(() => null);
}

const ShareBarButton: React.SFC<ShareBarButtonProps> = (props) => {
    return (
        <TouchableWithoutFeedback
            {...props}
            onPress={() => presentShareModal(props.message)}
        >
            <Image
                style={{
                    margin: 20,
                }}
                source={require('../../../imgs/share_boleto_icon.png')}
            />
        </TouchableWithoutFeedback>
    );
};

interface ShareBarButtonContainerProps {
    barcode: string;
}

function mapStateToProps(_: AppStore, ownProps: ShareBarButtonContainerProps): ShareBarButtonProps {
    return {
        message: getFormattedTypeableLine(ownProps.barcode),
    };
}

export default connect(mapStateToProps)(ShareBarButton);
