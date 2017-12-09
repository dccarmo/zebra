import React from 'react';
import { Platform, ScrollView } from 'react-native';

import { maroonHeaderStyle } from '../../constants';
import SelectedBoletoDetail from './SelectedBoletoDetail';
import WebServerBanner from './WebServerBanner';

class BoletoDetail extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
        title: Platform.OS === 'ios' ? '' : 'Boleto',
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <WebServerBanner />
                <SelectedBoletoDetail />
            </ScrollView>
        );
    }
}

export default BoletoDetail;
