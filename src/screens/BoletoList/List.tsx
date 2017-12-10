import React from 'react';
import {
    Platform,
    SectionList,
    SectionListData,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../../constants/index';
import ItemContainer from './containers/ItemContainer';
import { ItemStateProps } from './Item';
import SectionHeader from './SectionHeader';

export interface BoletoListSectionData extends SectionListData<ItemStateProps> {
    title: string;
}

export interface ListProps {
    sections: BoletoListSectionData[];
}

const List: React.SFC<ListProps> = (props) => {
    if (props.sections.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum boleto encontrado</Text>
            </View>
        );
    }

    return (
        <SectionList
            keyExtractor={(_, index) => `${index}`}
            sections={props.sections}
            renderItem={(data) => <ItemContainer {...data.item} />}
            renderSectionHeader={(info) =>
                info.section.title ? (
                    <SectionHeader title={info.section.title} />
                ) : null
            }
            stickySectionHeadersEnabled={false}
            contentContainerStyle={
                Platform.OS === 'android'
                    ? { paddingBottom: 82 }
                    : { paddingBottom: 16 }
            }
        />
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    emptyText: {
        color: colors.dustyGray,
    },
});

export default List;
