import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { maroonHeaderStyle } from '../../constants';
import { colors } from '../../constants';

import AddButtonContainer from './containers/AddButtonContainer';
import ListContainer from './containers/ListContainer';
import SegmentedControl from './SegmentedControl';

interface BoletoListState {
    selectedIndex: number;
}

class BoletoList extends React.Component<{}, BoletoListState> {
    static navigationOptions = {
        ...maroonHeaderStyle,
        headerRight:
            Platform.OS === 'ios' ? (
                <AddButtonContainer style={{ marginRight: 16 }} />
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
                    values={['Pendentes', 'Pagos', 'Todos']}
                >
                    <ListContainer selectedFilter={this.state.selectedIndex} />
                </SegmentedControl>
                {Platform.OS === 'android' && <AddButtonContainer />}
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
