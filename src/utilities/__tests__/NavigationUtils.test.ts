import { NavigationLeafRoute, NavigationState } from 'react-navigation';

import { getCurrentRoute } from '../NavigationUtils';

const mockBoletoListRoute: NavigationLeafRoute<any> = {
    key: '',
    params: '',
    routeName: 'BoletoList',
};

const mockNavigationState: NavigationState = {
    index: 0,
    routes: [mockBoletoListRoute],
};

describe('Navigation Utilities', () => {
    it('should get the current route', () => {
        expect(getCurrentRoute(mockNavigationState)).toEqual(
            mockBoletoListRoute,
        );
    });
});
