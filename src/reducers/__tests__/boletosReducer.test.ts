import { AddBoletoAction } from "../../actions";
import Boleto from "../../models/Boleto";
import boletosReducer from "../boletosReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        expect(boletosReducer([], AddBoletoAction(mockBoleto)))
        .toEqual([mockBoleto]);
    });

    it("shouldn't add the same boleto twice", () => {
        let state: Boleto[] = [mockBoleto];

        state = boletosReducer(state, AddBoletoAction(mockBoleto));
        expect(boletosReducer(state, AddBoletoAction(mockBoleto)))
        .toEqual([mockBoleto]);
    });
});
