import { NavigationActions } from 'react-navigation';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { addBoletoAction, selectBarcodeAction } from '../../actions/index';
import { addedBoletoSaga, selectedBoletoSaga } from '../navigationSagas';

const mockBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    paid: true,
    title: '',
};

describe('Navigation Sagas', () => {
    describe('dismiss the screen and select boleto after delay', () => {
        const gen = addedBoletoSaga(addBoletoAction(mockBoleto));

        it('get the selected boleto', () => {
            expect(gen.next().value).toEqual(put(NavigationActions.back()));
        });

        it('delays 500ms', () => {
            expect(gen.next().value).toEqual(call(delay, 500));
        });

        it('dispatch select barcode action', () => {
            expect(gen.next().value).toEqual(
                put(selectBarcodeAction(mockBoleto.barcode)),
            );
        });
    });

    describe('navigate to Boleto Detail', () => {
        const gen = selectedBoletoSaga();

        it('dispatch navigate action', () => {
            expect(gen.next().value).toEqual(
                put(NavigationActions.navigate({ routeName: 'BoletoDetail' })),
            );
        });
    });
});
