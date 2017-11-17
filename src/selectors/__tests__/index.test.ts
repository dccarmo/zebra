import { getPendingBoletos, getSelectedBoleto } from "../.";
import AppStore from "../../stores/AppStore";

const mockBoleto = {
    barcode: "02191618900000166510010847800017732009402163",
    paid: true,
    title: "",
};

const mockAppStore: AppStore = {
    boletos: [],
    nav: null,
    selectedBarcode: null,
    webServerInfo: {} as any,
};

describe("selectors", () => {
    it("should return empty for empty state", () => {
        expect(getPendingBoletos(mockAppStore)).toEqual([]);
    });

    it("should return none boletos", () => {
        expect(getPendingBoletos({ ...mockAppStore, boletos: [mockBoleto] })).toEqual([]);
    });

    it("should return the pending boleto", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        expect(getPendingBoletos({ ...mockAppStore, boletos: [mockBoleto, pendingBoleto] })).toEqual([pendingBoleto]);
    });

    it("should return undefined", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };
        const state = { ...mockAppStore, boletos: [pendingBoleto], selectedBarcode: "1" };

        expect(getSelectedBoleto(state)).toEqual(undefined);
    });

    it("should return the selected boleto", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };
        const state = { ...mockAppStore, boletos: [mockBoleto, pendingBoleto], selectedBarcode: mockBoleto.barcode };

        expect(getSelectedBoleto(state)).toEqual(mockBoleto);
    });
});
