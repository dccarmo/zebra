import {
    getAllBoletos,
    getPaidBoletos,
    getPendingBoletos,
    getSelectedBoleto,
} from '../.';
import { AppStore, BoletoStore } from '../../stores';

const mockPaidBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    paid: true,
    title: '',
};

const mockPendingBoleto = {
    barcode: '77591618900000166510010847800017732009402163',
    paid: false,
    title: '',
};

const mockAppStore: AppStore = {
    boletos: {
        allBarcodes: [],
        byBarcode: {},
    },
    navigation: {} as any,
    selectedBarcode: null,
    webServerInfo: {} as any,
};

describe('Selectors', () => {
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

    it('should return undefined', () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockPaidBoleto.barcode, mockPendingBoleto.barcode],
            byBarcode: {
                [mockPaidBoleto.barcode]: mockPaidBoleto,
                [mockPendingBoleto.barcode]: mockPendingBoleto,
            },
        };
        const state = { ...mockAppStore, boletos, selectedBarcode: '1' };

        expect(getSelectedBoleto(state)).toEqual(undefined);
    });

    it('should return the selected boleto', () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockPaidBoleto.barcode, mockPendingBoleto.barcode],
            byBarcode: {
                [mockPaidBoleto.barcode]: mockPaidBoleto,
                [mockPendingBoleto.barcode]: mockPendingBoleto,
            },
        };
        const state = {
            ...mockAppStore,
            boletos,
            selectedBarcode: mockPaidBoleto.barcode,
        };

        expect(getSelectedBoleto(state)).toEqual(mockPaidBoleto);
    });
});
