import { NavigationActions } from 'react-navigation';
import { delay } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { addBoletoAction, selectBarcodeAction } from '../../actions/index';
import { addedBoletoSaga, runAfterNavigationChannel, selectBoletoSaga } from '../navigationSagas';

const mockBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    dateAdded: Date.now(),
    paid: true,
    title: '',
};

describe('Navigation Sagas', () => {
    describe('dismiss the screen and select boleto after delay', () => {
        const gen = addedBoletoSaga(addBoletoAction(mockBoleto));
        const channel = runAfterNavigationChannel();

        it('get the selected boleto', () => {
            expect(gen.next().value).toEqual(put(NavigationActions.back()));
        });

        it('create channel to observe animation', () => {
            expect(gen.next().value).toEqual(call(runAfterNavigationChannel));
        });

        it('wait for the animation to finish', () => {
            expect(gen.next(channel).value).toEqual(take(channel));
        });

        it('dispatch select barcode action', () => {
            expect(gen.next().value).toEqual(
                put(selectBarcodeAction({ barcode: mockBoleto.barcode })),
            );
        });
    });

    describe('navigate to Boleto Detail', () => {
        const action = selectBarcodeAction({ barcode: mockBoleto.barcode });
        const gen = selectBoletoSaga(action);

        it('dispatch navigate action', () => {
            expect(gen.next().value).toEqual(
                put(NavigationActions.navigate({
                    params: { barcode: mockBoleto.barcode },
                    routeName: 'BoletoDetail',
                })),
            );
        });
    });
});
