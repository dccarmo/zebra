import { AddBoletoAction } from "../../actions";
import { BoletoStore } from "../../stores/index";
import boletosReducer from "../boletosReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        const state: BoletoStore = {allBarcodes: [], byBarcode: {}};

        expect(boletosReducer(state, AddBoletoAction(mockBoleto)))
        .toEqual({
            allBarcodes: ["02191618900000166510010847800017732009402163"],
            byBarcode: {"02191618900000166510010847800017732009402163": mockBoleto},
        });
    });

    it("shouldn't add the same boleto twice", () => {
        let state: BoletoStore = {allBarcodes: [], byBarcode: {}};

        state = boletosReducer(state, AddBoletoAction(mockBoleto));
        expect(boletosReducer(state, AddBoletoAction(mockBoleto)))
        .toEqual({
            allBarcodes: ["02191618900000166510010847800017732009402163"],
            byBarcode: {"02191618900000166510010847800017732009402163": mockBoleto},
        });
    });
});
