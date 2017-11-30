import { connect } from "react-redux";

import {
    getBarcodeAmount,
    getBarcodeBank,
    getBarcodeDueDate,
    getBarcodeSegment,
    getFormattedTypeableLine } from "../../models/Boleto";
import { getSelectedBoleto } from "../../selectors";
import { AppStore } from "../../stores";
import { formatAmount } from "../../utilities/FormatUtils";
import Detail, { DetailProps } from "./Detail";

function getAmount(barcode: string): string {
    return `${formatAmount(getBarcodeAmount(barcode))}`;
}

function mapStateToProps(state: AppStore): DetailProps {
    const boleto = getSelectedBoleto(state)!;

    return {
        amount: getAmount(boleto.barcode),
        bank: getBarcodeBank(boleto.barcode),
        barcode: boleto.barcode,
        dueDate: getBarcodeDueDate(boleto.barcode) ? getBarcodeDueDate(boleto.barcode)! : null,
        segment: getBarcodeSegment(boleto.barcode),
        title: boleto.title ? boleto.title! : "Sem Título",
        typeableLine: getFormattedTypeableLine(boleto.barcode),
    };
}

const SelectedBoletoDetail = connect(mapStateToProps)(Detail);

export default SelectedBoletoDetail;
