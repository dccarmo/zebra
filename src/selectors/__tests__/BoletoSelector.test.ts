import BoletoStore from "../../stores/BoletoStore";
import BoletoSelector from "../BoletoSelector";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", paid: true, title: "" };

describe("boleto reducer", () => {
    let state: BoletoStore;

    beforeEach(() => {
        state = { boletos: [] };
    });

    it("should return empty for empty state", () => {
        expect(BoletoSelector.getPendingBoletos(state)).toEqual([]);
    });

    it("should return none boletos", () => {
        state.boletos.push(mockBoleto);
        expect(BoletoSelector.getPendingBoletos(state)).toEqual([]);
    });

    it("should return the pending boleto", () => {
        state.boletos.push(mockBoleto);

        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        state.boletos.push(pendingBoleto);
        expect(BoletoSelector.getPendingBoletos(state)).toEqual([pendingBoleto]);
    });

    it("should return undefined", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        state.boletos.push(pendingBoleto);
        expect(BoletoSelector.getBoleto(state, "1")).toEqual(undefined);
    });

    it("should return the searched boleto", () => {
        state.boletos.push(mockBoleto);

        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        state.boletos.push(pendingBoleto);
        expect(BoletoSelector.getBoleto(state, mockBoleto.barcode)).toEqual(mockBoleto);
    });
});
