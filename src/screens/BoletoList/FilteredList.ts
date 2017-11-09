import * as accounting from "accounting";
import { connect } from "react-redux";

import { getBarcodeAmount, getBarcodeDueDate, getTitle } from "../../models/Boleto";
import BoletoSelector from "../../selectors/BoletoSelector";
import AppStore from "../../stores/AppStore";
import { currencySettings } from "./../../constants/index";
import List, { ListProps } from "./List";

function getAmount(barcode: string): string {
    return `${accounting.formatMoney(getBarcodeAmount(barcode), currencySettings)}`;
}

function mapStateToProps(state: AppStore): ListProps {
    return {
        data: BoletoSelector.getPendingBoletos(state.boletos).map((boleto) => ({
            amount: getAmount(boleto.barcode),
            barcode: boleto.barcode,
            dueDate: getBarcodeDueDate(boleto.barcode),
            title: getTitle(boleto) ? getTitle(boleto)! : "Desconhecido",
        })),
    };
}

const FilteredList = connect(mapStateToProps)(List);

export default FilteredList;
