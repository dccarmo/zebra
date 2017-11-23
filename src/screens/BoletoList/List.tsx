import React from "react";
import { SectionList, SectionListData } from "react-native";
import { StyleSheet } from "react-native";

import { colors } from "../../constants";
import { ItemStateProps } from "./Item";
import SectionHeader from "./SectionHeader";
import SelectableItem from "./SelectableItem";

export type BoletoListSectionData = SectionListData<ItemStateProps>;

export interface ListProps {
    sections: BoletoListSectionData[];
}

const List: React.SFC<ListProps> = (props) => (
    <SectionList
        keyExtractor={(_, index) => (`${index}`)}
        sections={props.sections}
        renderItem={(data) => (<SelectableItem {...data.item} />)}
        renderSectionHeader={(info) => (info.section.title ? <SectionHeader title={info.section.title} /> : null)}
        stickySectionHeadersEnabled={false}
        style={styles.list}
    />
);

const styles = StyleSheet.create({
    list: {
        backgroundColor: colors.blackSqueeze,
  },
});

export default List;
