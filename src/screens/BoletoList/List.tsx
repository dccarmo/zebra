import React from "react";
import { SectionList } from "react-native";
import { StyleSheet } from "react-native";

import { colors } from "../../constants";
import { ItemStateProps } from "./Item";
import Section from "./Section";
import SelectableItem from "./SelectableItem";

export interface ListProps {
    data: ItemStateProps[];
}

const List: React.SFC<ListProps> = (props) => (
    <SectionList
        keyExtractor={(_, index) => (`${index}`)}
        sections={[{ data: props.data, title: "" }]}
        renderItem={(data) => (<SelectableItem {...data.item} />)}
        renderSectionHeader={() => (<Section />)}
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
