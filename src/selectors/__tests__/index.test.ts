import { getPendingBoletos, getSelectedBoleto } from "../.";
import { AppStore, BoletoStore } from "../../stores";

const mockBoleto = {
    barcode: "02191618900000166510010847800017732009402163",
    paid: true,
    title: "",
};

const mockAppStore: AppStore = {
    boletos: {
        allBarcodes: [],
        byBarcode: {},
    },
    nav: null,
    selectedBarcode: null,
    webServerInfo: {} as any,
};

describe("selectors", () => {
    it("should return empty for empty state", () => {
        expect(getPendingBoletos(mockAppStore)).toEqual([]);
    });

    it("should return none boletos", () => {
        const boletos: BoletoStore = {
            allBarcodes: [mockBoleto.barcode],
            byBarcode: {[mockBoleto.barcode]: mockBoleto},
        };

        expect(getPendingBoletos({ ...mockAppStore, boletos })).toEqual([]);
    });

    it("should return the pending boleto", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };
        const boletos: BoletoStore = {
            allBarcodes: [mockBoleto.barcode, pendingBoleto.barcode],
            byBarcode: {[mockBoleto.barcode]: mockBoleto, [pendingBoleto.barcode]: pendingBoleto },
        };

        expect(getPendingBoletos({ ...mockAppStore, boletos })).toEqual([pendingBoleto]);
    });

    it("should return undefined", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };
        const boletos: BoletoStore = {
            allBarcodes: [mockBoleto.barcode, pendingBoleto.barcode],
            byBarcode: {[mockBoleto.barcode]: mockBoleto, [pendingBoleto.barcode]: pendingBoleto },
        };
        const state = { ...mockAppStore, boletos, selectedBarcode: "1" };

        expect(getSelectedBoleto(state)).toEqual(undefined);
    });

    it("should return the selected boleto", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };
        const boletos: BoletoStore = {
            allBarcodes: [mockBoleto.barcode, pendingBoleto.barcode],
            byBarcode: {[mockBoleto.barcode]: mockBoleto, [pendingBoleto.barcode]: pendingBoleto },
        };
        const state = { ...mockAppStore, boletos, selectedBarcode: mockBoleto.barcode };

        expect(getSelectedBoleto(state)).toEqual(mockBoleto);
    });
});
