import Boleto from "../../models/Boleto";
import BoletoSelector from "../BoletoSelector";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", paid: true, title: "" };

describe("boleto reducer", () => {
    let boletos: Boleto[];

    beforeEach(() => {
        boletos = [];
    });

    it("should return empty for empty state", () => {
        expect(BoletoSelector.getPendingBoletos(boletos)).toEqual([]);
    });

    it("should return none boletos", () => {
        boletos.push(mockBoleto);
        expect(BoletoSelector.getPendingBoletos(boletos)).toEqual([]);
    });

    it("should return the pending boleto", () => {
        boletos.push(mockBoleto);

        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        boletos.push(pendingBoleto);
        expect(BoletoSelector.getPendingBoletos(boletos)).toEqual([pendingBoleto]);
    });

    it("should return undefined", () => {
        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        boletos.push(pendingBoleto);
        expect(BoletoSelector.getBoleto(boletos, "1")).toEqual(undefined);
    });

    it("should return the searched boleto", () => {
        boletos.push(mockBoleto);

        const pendingBoleto = {
            barcode: "",
            paid: false,
            title: "",
        };

        boletos.push(pendingBoleto);
        expect(BoletoSelector.getBoleto(boletos, mockBoleto.barcode)).toEqual(mockBoleto);
    });
});
