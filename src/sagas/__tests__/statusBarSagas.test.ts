import { StatusBar } from 'react-native';
import { NavigationLeafRoute, NavigationState } from 'react-navigation';
import { call, select } from 'redux-saga/effects';

import { getNavigationState } from '../../selectors/index';
import { getCurrentRoute } from '../../utilities/NavigationUtils';
import { updateStatusBarSaga } from '../statusBarSagas';

const mockBarcodeReaderRoute: NavigationLeafRoute<any> = {
    key: '',
    params: '',
    routeName: 'BarcodeReader',
};

const mockBoletoListRoute: NavigationLeafRoute<any> = {
    key: '',
    params: '',
    routeName: 'BoletoList',
};

function createNavigationState(
    route: NavigationLeafRoute<any>,
): NavigationState {
    return {
        index: 0,
        routes: [route],
    };
}

describe('Status Bar Sagas', () => {
    describe('hides the status bar', () => {
        const gen = updateStatusBarSaga();
        const navigationState = createNavigationState(mockBarcodeReaderRoute);

        it('gets the navigation state', () => {
            expect(gen.next().value).toEqual(select(getNavigationState));
        });

        it('gets the current route', () => {
            expect(gen.next(navigationState).value).toEqual(
                call(getCurrentRoute, navigationState),
            );
        });

        it('hides the status bar', () => {
            expect(gen.next(mockBarcodeReaderRoute).value).toEqual(
                call(StatusBar.setHidden, true, 'slide'),
            );
        });
    });

    describe('shows the status bar', () => {
        const gen = updateStatusBarSaga();
        const navigationState = createNavigationState(mockBoletoListRoute);

        it('gets the navigation state', () => {
            expect(gen.next().value).toEqual(select(getNavigationState));
        });

        it('gets the current route', () => {
            expect(gen.next(navigationState).value).toEqual(
                call(getCurrentRoute, navigationState),
            );
        });

        it('shows the status bar', () => {
            expect(gen.next(mockBarcodeReaderRoute).value).toEqual(
                call(StatusBar.setHidden, true, 'slide'),
            );
        });
    });
});
