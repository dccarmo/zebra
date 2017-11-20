import * as accounting from "accounting";
import { connect } from "react-redux";

import { getBarcodeAmount, getBarcodeDueDate, getTitle } from "../../models/Boleto";
import Boleto from "../../models/Boleto";
import { getAllBoletos, getPaidBoletos, getPendingBoletos } from "../../selectors";
import { AppStore } from "../../stores";
import { currencySettings } from "./../../constants/index";
import List, { ListProps } from "./List";

enum FilterOption {
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

    return {
        data: boletos.map((boleto) => ({
            amount: `${accounting.formatMoney(getBarcodeAmount(boleto.barcode), currencySettings)}`,
            barcode: boleto.barcode,
            dueDate: getBarcodeDueDate(boleto.barcode),
            title: getTitle(boleto) ? getTitle(boleto)! : "Sem Título",
        })),
    };
}

const FilteredList = connect<ListProps, {}, FilteredListProps>(mapStateToProps)(List);

export default FilteredList;
