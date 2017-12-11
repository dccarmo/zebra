import React from 'react';
import { Platform, ScrollView } from 'react-native';

import { maroonHeaderStyle } from '../../constants';
import BannerContainer from './containers/BannerContainer';
import DetailContainer from './containers/DetailContainer';
import ShareBarButtonContainer from './containers/ShareBarButtonContainer';

class BoletoDetail extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
        headerRight: <ShareBarButtonContainer />,
        title: Platform.OS === 'ios' ? '' : 'Boleto',
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <BannerContainer />
                <DetailContainer style={{ margin: 16 }} />
            </ScrollView>
        );
    }
}

export default BoletoDetail;
