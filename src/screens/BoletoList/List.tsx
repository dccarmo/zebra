import React from "react";
import { Platform, SectionList, SectionListData } from "react-native";

import { ItemStateProps } from "./Item";
import SectionHeader from "./SectionHeader";
import SelectableItem from "./SelectableItem";

export interface BoletoListSectionData extends SectionListData<ItemStateProps> {
    title: string;
}

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
        contentContainerStyle={Platform.OS === "android" ? { paddingBottom: 82 } : { paddingBottom: 16 }}
    />
);

export default List;
