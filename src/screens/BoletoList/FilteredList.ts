import * as accounting from "accounting";
import { connect } from "react-redux";

import { getBarcodeAmount, getBarcodeDueDate, getTitle } from "../../models/Boleto";
import { getPendingBoletos } from "../../selectors";
import { AppStore } from "../../stores";
import { currencySettings } from "./../../constants/index";
import List, { ListProps } from "./List";

function getAmount(barcode: string): string {
    return `${accounting.formatMoney(getBarcodeAmount(barcode), currencySettings)}`;
}

function mapStateToProps(state: AppStore): ListProps {
    return {
        data: getPendingBoletos(state).map((boleto) => ({
            amount: getAmount(boleto.barcode),
            barcode: boleto.barcode,
            dueDate: getBarcodeDueDate(boleto.barcode),
            title: getTitle(boleto) ? getTitle(boleto)! : "Sem Título",
        })),
    };
}

const FilteredList = connect(mapStateToProps)(List);

export default FilteredList;
