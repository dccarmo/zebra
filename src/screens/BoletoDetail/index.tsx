import React from 'react';
import { Platform, ScrollView } from 'react-native';
import {
    NavigationAction,
    NavigationRoute,
    NavigationScreenProp,
    NavigationScreenProps,
} from 'react-navigation';

import { maroonHeaderStyle } from '../../constants';
import Banner from './Banner';
import Detail from './Detail';
import ShareBarButton from './ShareBarButton';

interface BoletoDetailProps {
    barcode: string;
}

class BoletoDetail extends React.Component<
    NavigationScreenProps<BoletoDetailProps>
> {
    static navigationOptions = ({
        navigation,
    }: {
        navigation: NavigationScreenProp<
            NavigationRoute<BoletoDetailProps>,
            NavigationAction
        >;
    }) => ({
        ...maroonHeaderStyle,
        headerRight: (
            <ShareBarButton barcode={navigation.state.params.barcode} />
        ),
        title: Platform.OS === 'ios' ? '' : 'Boleto',
    })

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Banner />
                <Detail
                    barcode={this.props.navigation.state.params.barcode}
                    style={{ margin: 16 }}
                />
            </ScrollView>
        );
    }
}

export default BoletoDetail;
