import React from 'react';
import { Image, Share, TouchableWithoutFeedback } from 'react-native';

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
        <TouchableWithoutFeedback {...props} onPress={() => presentShareModal(props.message)}>
            <Image
                style={{
                    margin: 20,
                }}
                source={require('../../../imgs/share_boleto_icon.png')}
            />
        </TouchableWithoutFeedback>
    );
};

export default ShareBarButton;
