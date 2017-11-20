import * as accounting from "accounting";
import { connect } from "react-redux";

import {
    getBarcodeAmount,
    getBarcodeBank,
    getBarcodeDueDate,
    getBarcodeSegment,
    getFormattedTypeableLine } from "../../models/Boleto";
import { getSelectedBoleto } from "../../selectors";
import { AppStore } from "../../stores";
import { currencySettings } from "./../../constants/index";
import Detail, { DetailProps } from "./Detail";

function getAmount(barcode: string): string {
    return `${accounting.formatMoney(getBarcodeAmount(barcode), currencySettings)}`;
}

function mapStateToProps(state: AppStore): DetailProps {
    const boleto = getSelectedBoleto(state)!;

    return {
        amount: getAmount(boleto.barcode),
        bank: getBarcodeBank(boleto.barcode),
        barcode: boleto.barcode,
        dueDate: getBarcodeDueDate(boleto.barcode) ? getBarcodeDueDate(boleto.barcode)!.toDateString() : null,
        segment: getBarcodeSegment(boleto.barcode),
        title: boleto.title ? boleto.title! : "Sem Título",
        typeableLine: getFormattedTypeableLine(boleto.barcode),
    };
}

const SelectedBoletoDetail = connect(mapStateToProps)(Detail);

export default SelectedBoletoDetail;
