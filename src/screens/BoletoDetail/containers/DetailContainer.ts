import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    requestDeleteBoletoAction,
    toggleBoletoPaidAction,
    updateBoletoTitleAction,
} from '../../../actions/index';
import {
    getBarcodeAmount,
    getBarcodeBank,
    getBarcodeDueDate,
    getBarcodeSegment,
    getFormattedTypeableLine,
} from '../../../models/Boleto';
import { getSelectedBoleto } from '../../../selectors';
import { AppStore } from '../../../stores';
import { formatAmount } from '../../../utilities/FormatUtils';
import Detail, { DetailDispatchProps, DetailStateProps } from '../Detail';

function getAmount(barcode: string): string {
    return `${formatAmount(getBarcodeAmount(barcode))}`;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DetailDispatchProps {
    return {
        onChangeTitle: (barcode, title) =>
            dispatch(updateBoletoTitleAction({ barcode, title })),
        onDeleteBoleto: (barcode) => {
            dispatch(requestDeleteBoletoAction({ barcode }));
        },
        onTogglePaid: (barcode) => dispatch(toggleBoletoPaidAction({ barcode })),
    };
}

function mapStateToProps(state: AppStore): DetailStateProps {
    const boleto = getSelectedBoleto(state)!;

    return {
        amount: getAmount(boleto.barcode),
        bank: getBarcodeBank(boleto.barcode),
        barcode: boleto.barcode,
        dueDate: getBarcodeDueDate(boleto.barcode)
            ? getBarcodeDueDate(boleto.barcode)!
            : null,
        paid: boleto.paid,
        segment: getBarcodeSegment(boleto.barcode),
        title: boleto.title,
        typeableLine: getFormattedTypeableLine(boleto.barcode),
    };
}

const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(Detail);

export default DetailContainer;
