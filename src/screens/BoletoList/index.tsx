import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { maroonHeaderStyle } from '../../constants';
import { colors } from '../../constants';
import I18n from '../../constants/i18n';
import AddActionButton from './AddActionButton';
import AddBarButton from './AddBarButton';
import List from './List';
import SegmentedControl from './SegmentedControl';

interface BoletoListState {
    selectedIndex: number;
}

class BoletoList extends React.Component<{}, BoletoListState> {
    static navigationOptions = {
        ...maroonHeaderStyle,
        headerRight:
            Platform.OS === 'ios' ? (
                <AddBarButton style={{ marginRight: 16 }} />
            ) : null,
        headerStyle: {
            backgroundColor: colors.monza,
            borderBottomWidth: 0,
            elevation: 0,
        },
        title: Platform.OS === 'ios' ? 'Boletos' : 'Zebra',
    };

    constructor() {
        super();

        this.state = {
            selectedIndex: 0,
        };
    }

    render() {
        return (
            <View style={styles.screen}>
                <SegmentedControl
                    style={{ flex: 1 }}
                    initialSelectedIndex={0}
                    onIndexChange={(index) =>
                        this.setState({ selectedIndex: index })
                    }
                    values={[
                        I18n.t('boletoList.filter.pending'),
                        I18n.t('boletoList.filter.paid'),
                        I18n.t('boletoList.filter.all'),
                    ]}
                >
                    <List selectedFilter={this.state.selectedIndex} />
                </SegmentedControl>
                {Platform.OS === 'android' && <AddActionButton />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.blackSqueeze,
        flex: 1,
    },
});

export default BoletoList;
