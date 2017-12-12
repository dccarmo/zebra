import { compareAsc, compareDesc, startOfToday } from 'date-fns';
import { connect } from 'react-redux';

import I18n from '../../../constants/i18n';
import Boleto, {
    getBarcodeAmount,
    getBarcodeDueDate,
    getTitle,
} from '../../../models/Boleto';
import {
    getAllBoletos,
    getPaidBoletos,
    getPendingBoletos,
} from '../../../selectors';
import { AppStore } from '../../../stores';
import {
    filterItemsByNotNextDays,
    mapItemsToMonthlySections,
    mapNextDaysItemsToSection,
    sortItems,
    sortSections,
} from '../../../utilities/BoletoListUtils';
import { formatAmount } from '../../../utilities/FormatUtils';
import { ItemStateProps } from '../Item';
import List, { BoletoListSectionData, ListProps } from '../List';

export enum FilterOption {
    Pending,
    Paid,
    All,
}

interface ListContainerProps {
    selectedFilter: FilterOption;
}

function mapStateToProps(
    state: AppStore,
    ownProps: ListContainerProps,
): ListProps {
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

    const items: ItemStateProps[] = boletos.map((boleto) => ({
        amount: `${formatAmount(getBarcodeAmount(boleto.barcode))}`,
        barcode: boleto.barcode,
        dueDate: getBarcodeDueDate(boleto.barcode),
        paid: boleto.paid,
        title: getTitle(boleto) ? getTitle(boleto)! : I18n.t('boletoList.listContainer.noTitle'),
    }));

    if (ownProps.selectedFilter === FilterOption.Pending) {
        const notNextDaysItems = filterItemsByNotNextDays(
            items,
            startOfToday(),
            7,
        );
        const nextDaysSection = mapNextDaysItemsToSection(
            sortItems(items, compareAsc),
            startOfToday(),
            7,
        );
        let sections: BoletoListSectionData[] = [];

        if (nextDaysSection) {
            sections = [nextDaysSection];
        }

        sections = [
            ...sections,
            ...sortSections(
                mapItemsToMonthlySections(
                    sortItems(notNextDaysItems, compareDesc),
                ),
                compareDesc,
            ),
        ];

        return { sections };
    }

    return {
        sections: sortSections(
            mapItemsToMonthlySections(sortItems(items, compareDesc)),
            compareDesc,
        ),
    };
}

const ListContainer = connect(mapStateToProps)(
    List,
);

export default ListContainer;
