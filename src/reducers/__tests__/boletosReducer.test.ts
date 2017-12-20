import lolex from 'lolex';

import {
    addBoletoAction,
    toggleBoletoPaidAction,
    updateBoletoTitleAction,
} from '../../actions';
import { AppStore, BoletoStore } from '../../stores';
import boletosReducer, { getAllBoletos, getPaidBoletos, getPendingBoletos } from '../boletosReducer';

const mockBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    dateAdded: 0,
    paid: false,
    title: null,
};

const mockPaidBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    dateAdded: Date.now(),
    paid: true,
    title: '',
};

const mockPendingBoleto = {
    barcode: '77591618900000166510010847800017732009402163',
    dateAdded: Date.now(),
    paid: false,
    title: '',
};

const mockAppStore: AppStore = {
    boletos: {
        allBarcodes: [],
        byBarcode: {},
    },
    navigation: {} as any,
    webServerInfo: {} as any,
};

describe('Boletos selectors', () => {
    it('should return empty for empty state', () => {
        expect(getPendingBoletos(mockAppStore)).toEqual([]);
    });

    it('should return no boletos', () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockPaidBoleto.barcode],
            byBarcode: { [mockPaidBoleto.barcode]: mockPaidBoleto },
        };

        expect(getPendingBoletos({ ...mockAppStore, boletos })).toEqual([]);
    });

    it('should return the pending boleto', () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockPaidBoleto.barcode, mockPendingBoleto.barcode],
            byBarcode: {
                [mockPaidBoleto.barcode]: mockPaidBoleto,
                [mockPendingBoleto.barcode]: mockPendingBoleto,
            },
        };

        expect(getPendingBoletos({ ...mockAppStore, boletos })).toEqual([
            mockPendingBoleto,
        ]);
    });

    it('should return the paid boleto', () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockPaidBoleto.barcode, mockPendingBoleto.barcode],
            byBarcode: {
                [mockPaidBoleto.barcode]: mockPaidBoleto,
                [mockPendingBoleto.barcode]: mockPendingBoleto,
            },
        };

        expect(getPaidBoletos({ ...mockAppStore, boletos })).toEqual([
            mockPaidBoleto,
        ]);
    });

    it('should return all boletos', () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockPaidBoleto.barcode, mockPendingBoleto.barcode],
            byBarcode: {
                [mockPaidBoleto.barcode]: mockPaidBoleto,
                [mockPendingBoleto.barcode]: mockPendingBoleto,
            },
        };

        expect(getAllBoletos({ ...mockAppStore, boletos })).toEqual([
            mockPaidBoleto,
            mockPendingBoleto,
        ]);
    });
});

describe('Boleto Reducer', () => {
    beforeAll(() => {
        lolex.install();
    });

    afterAll(() => {
        lolex.uninstall();
    });

    it('should add a boleto', () => {
        const state: BoletoStore = { allBarcodes: [], byBarcode: {} };

        expect(boletosReducer(state, addBoletoAction(mockBoleto))).toEqual({
            allBarcodes: ['02191618900000166510010847800017732009402163'],
            byBarcode: {
                '02191618900000166510010847800017732009402163': mockBoleto,
            },
        });
    });

    it("shouldn't add the same boleto twice", () => {
        let state: BoletoStore = { allBarcodes: [], byBarcode: {} };

        state = boletosReducer(state, addBoletoAction(mockBoleto));
        expect(boletosReducer(state, addBoletoAction(mockBoleto))).toEqual({
            allBarcodes: ['02191618900000166510010847800017732009402163'],
            byBarcode: {
                '02191618900000166510010847800017732009402163': mockBoleto,
            },
        });
    });

    it('should update the title', () => {
        let state: BoletoStore = { allBarcodes: [], byBarcode: {} };

        state = boletosReducer(state, addBoletoAction(mockBoleto));
        expect(
            boletosReducer(
                state,
                updateBoletoTitleAction({
                    barcode: mockBoleto.barcode,
                    title: 'Title',
                }),
            ),
        ).toEqual({
            allBarcodes: ['02191618900000166510010847800017732009402163'],
            byBarcode: {
                '02191618900000166510010847800017732009402163': {
                    ...mockBoleto,
                    title: 'Title',
                },
            },
        });
    });

    it('should toggle paid', () => {
        let state: BoletoStore = { allBarcodes: [], byBarcode: {} };

        state = boletosReducer(state, addBoletoAction(mockBoleto));
        expect(
            boletosReducer(
                state,
                toggleBoletoPaidAction({ barcode: mockBoleto.barcode }),
            ),
        ).toEqual({
            allBarcodes: ['02191618900000166510010847800017732009402163'],
            byBarcode: {
                '02191618900000166510010847800017732009402163': {
                    ...mockBoleto,
                    paid: true,
                },
            },
        });
    });
});
