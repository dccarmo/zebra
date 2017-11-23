import * as accounting from "accounting";
import { compareAsc, compareDesc, startOfToday } from "date-fns";
import { connect } from "react-redux";

import Boleto, { getBarcodeAmount, getBarcodeDueDate, getTitle } from "../../models/Boleto";
import { getAllBoletos, getPaidBoletos, getPendingBoletos } from "../../selectors";
import { AppStore } from "../../stores";
import {
    filterItemsByNotNextDays,
    mapItemsToMonthlySections,
    mapNextDaysItemsToSection,
    sortItems,
    sortSections } from "../../utilities/BoletoListUtils";
import { currencySettings } from "./../../constants";
import { ItemStateProps } from "./Item";
import List, { ListProps } from "./List";

export enum FilterOption {
    Pending,
    Paid,
    All,
}

interface FilteredListProps {
    selectedFilter: FilterOption;
}

function mapStateToProps(state: AppStore, ownProps: FilteredListProps): ListProps {
    let boletos: Boleto[];

    switch (ownProps.selectedFilter) {
        case FilterOption.Pending:
            boletos = getPendingBoletos(state);
            break;

        case FilterOption.Paid:
            boletos = getPaidBoletos(state);
            break;

        default:
            boletos = getAllBoletos(state);
    }

    const items: ItemStateProps[] = boletos
    .map((boleto) => ({
        amount: `${accounting.formatMoney(getBarcodeAmount(boleto.barcode), currencySettings)}`,
        barcode: boleto.barcode,
        dueDate: getBarcodeDueDate(boleto.barcode),
        title: getTitle(boleto) ? getTitle(boleto)! : "Sem Título",
    }));

    if (ownProps.selectedFilter === FilterOption.Pending) {
        const notCloseItems = filterItemsByNotNextDays(items, startOfToday(), 7);

        return {
            sections: [
                mapNextDaysItemsToSection(sortItems(items, compareAsc), startOfToday(), 7),
                ...sortSections(mapItemsToMonthlySections(sortItems(notCloseItems, compareDesc)), compareDesc),
            ],
        };
    }

    return {
        sections: sortSections(mapItemsToMonthlySections(sortItems(items, compareDesc)), compareDesc),
    };
}

const FilteredList = connect<ListProps, {}, FilteredListProps>(mapStateToProps)(List);

export default FilteredList;
