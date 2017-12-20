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
import { getBoleto } from '../../../reducers/boletosReducer';
import { AppStore } from '../../../stores';
import { formatAmount } from '../../../utilities/FormatUtils';
import { DetailDispatchProps, DetailStateProps } from './';

interface DetailContainerProps {
    barcode: string;
}

function getAmount(barcode: string): string {
    return `${formatAmount(getBarcodeAmount(barcode))}`;
}

export function mapDispatchToProps(dispatch: Dispatch<any>): DetailDispatchProps {
    return {
        onChangeTitle: (barcode, title) =>
            dispatch(updateBoletoTitleAction({ barcode, title })),
        onDeleteBoleto: (barcode) => {
            dispatch(requestDeleteBoletoAction({ barcode }));
        },
        onTogglePaid: (barcode) => dispatch(toggleBoletoPaidAction({ barcode })),
    };
}

export function mapStateToProps(state: AppStore, ownProps: DetailContainerProps): DetailStateProps {
    const boleto = getBoleto(state, ownProps.barcode)!;

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
