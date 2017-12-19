import React from 'react';
import { Platform, ScrollView } from 'react-native';

import { maroonHeaderStyle } from '../../constants';
import Banner from './Banner';
import Detail from './Detail';
import ShareBarButton from './ShareBarButton';

class BoletoDetail extends React.Component {
    static navigationOptions = {
        ...maroonHeaderStyle,
        headerRight: <ShareBarButton />,
        title: Platform.OS === 'ios' ? '' : 'Boleto',
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Banner />
                <Detail style={{ margin: 16 }} />
            </ScrollView>
        );
    }
}

export default BoletoDetail;
